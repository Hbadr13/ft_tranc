import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RoomModule } from 'src/game/room/room.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
    constructor(private prisma: PrismaService) {
    }

    /******************************************************* Channel Message ****************************************************************/

    async createChannel(body, idUser: number) {
        const room = await this.prisma.room.create({
            data: {
                name: body.name,
                description: body.description,
                type: body.type,
                password: body.password,
            },
        });
        await this.prisma.membership.create({
            data: {
                room: {
                    connect: {
                        id: room.id
                    }
                },
                user: {
                    connect: {
                        id: idUser
                    }
                },
                isOwner: true,
                isAdmin: true,
            }
        });

        if (body.type == 'private') {
            body.people.map(async (id) => {
                await this.prisma.membership.create({
                    data: {
                        room: {
                            connect: {
                                id: room.id
                            }
                        },
                        user: {
                            connect: {
                                id: id
                            }
                        },
                        isOwner: false,
                        isAdmin: false,
                    }
                });
            })
        }

        await this.prisma.conversation.create({
            data: {
                type: 'channel',
                room: {
                    connect: {
                        id: room.id,
                    },
                },
            },
        });
    }

    async getAllChannelByUserId(idUser: number) {

        const room = await this.prisma.user.findUnique({
            where: {
                id: idUser
            },
            include: {
                memberships: {
                    select: {
                        room: {
                            select: {
                                id: true,
                                name: true,
                                type: true,
                                password: true,
                                updatedAt: true
                            }
                        }
                    }
                }
            }
        })

        let banned = await this.prisma.user.findUnique({
            where: { id: idUser },
            include: {
                memberships: {
                    where: { isBanned: true },
                    select: { roomId: true }
                }
            }
        })
        let allRoom = room.memberships.map(membership => membership.room);
        allRoom = allRoom.filter(item => !banned.memberships.some(item2 => item2.roomId === item.id));
        allRoom.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

        return allRoom;
    }

    async joinChannel(idUser: number, idRoom: number, password: string) {
        const room = await this.prisma.room.findFirst({
            where: {
                id: idRoom
            }
        })
        if (!room)
            throw new NotFoundException('group not found')
        if (room.type == "public" || (room.type == "protected" && room.password == password)) {
            await this.prisma.membership.create({
                data: {
                    room: {
                        connect: {
                            id: idRoom,
                        }
                    },
                    user: {
                        connect: {
                            id: idUser,
                        }
                    },
                    isOwner: false,
                    isAdmin: false,
                    isBanned: false,
                }
            });
            let Conversation = await this.prisma.conversation.findUnique({
                where: {
                    type: 'channel',
                    roomId: idRoom
                }
            });
            Conversation = await this.prisma.conversation.update({
                where: {
                    id: Conversation.id
                },
                data: {
                    participants: {
                        connect: {
                            id: idUser
                        }
                    },
                }
            });
            return (room);
        }
        else {
            throw new NotFoundException('dont join channel')

        }

        // await this.prisma.message.create({
        //     data: {
        //         content: null,
        //         sender: {
        //             connect: {
        //                 id: idUser
        //             }
        //         },
        //         chat: {
        //             connect: {
        //                 id: Conversation.id
        //             }
        //         }
        //     }
        // });
    }

    async sendMessageToChannel(body, idRoom: number, idUser: number) {
      

        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser,
            },
            include: {
                conversations: {
                    where: {
                        roomId: idRoom
                    },
                },
            }
        })

        // console.log(',,,,,',idUser, body.content,user.conversations[0])

        if (user) {


            let Conversation = await this.prisma.conversation.findUnique({
                where: {
                    type: 'channel',
                    roomId: idRoom
                }
            });
            // console.log("Conversation:" ,Conversation)
            Conversation = await this.prisma.conversation.update({
                where: {
                    id: Conversation.id
                },
                data: {
                    participants: {
                        connect: {
                            id: idUser
                        }
                    },
                }
            });
            let msg = await this.prisma.message.create({
                data: {
                    content: body.content,
                    sender: {
                        connect: {
                            id: idUser
                        }
                    },
                    chat: {
                        connect: {
                            id: Conversation.id
                        }
                    }
                }
            });
            let r = await this.prisma.room.update({
                where: { id: idRoom },
                data: { updatedAt: msg.createdAt }
            })
        }

    }

    async getallMessagesChannel(idUser: number, idRoom: number) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: idUser,
            },
            include: {

                conversations: {
                    where: {
                        roomId: idRoom
                    },
                    select: {

                        messages: true,
                        participants: {
                            select: {
                                username: true,
                                foto_user: true,
                                id: true
                            }
                        }
                    },
                },
            }
        })
        if (!user.conversations[0])
            return 0;

        const conversation = user.conversations[0];
        conversation.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        const resultMessages = conversation.messages
            .map((message) => ({
                id: message.id,
                content: message.content,
                createdAt: message.createdAt,
                senderId: message.senderId,
                chatId: message.chatId,
                username: conversation.participants.find((participant) => participant.id === message.senderId)?.username,
                foto_user: conversation.participants.find((participant) => participant.id === message.senderId)?.foto_user,
            }));


        return resultMessages

    }

    async allUsersChannel(roomId: number) {
        let membership = await this.prisma.room.findFirst({
            where: {
                id: roomId,
            },
            select: {
                name: true,
                Memberships: {
                    select: {
                        isAdmin: true,
                        isOwner: true,
                        isBanned: true,
                        timeMute: true,
                        userId: true,
                        user: {
                            select: {
                                username: true,
                                foto_user: true,
                                id: true,
                            }
                        }
                    }
                }
            }
        })
        const participant = membership.Memberships.map((m) => ({
            id: m.user.id,
            username: m.user.username,
            isAdmin: m.isAdmin,
            isOwner: m.isOwner,
            isBanned: m.isBanned,
            timeMute: m.timeMute,
            foto_user: m.user.foto_user
        }));
        return participant;
    }
    async oneChannel(roomId: number) {
        let membership = await this.prisma.room.findFirst({
            where: {
                id: roomId,
            },
            select: {
                name: true,
                id: true,
                type: true,
                password: true,

            }

        })

        return membership;
    }


    async allChannel(userId: number) {
        let room = await this.prisma.room.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                description: true,
            }
        })

        let roomUser = await this.prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                memberships: {
                    select: {
                        room: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }
            }
        })



        let roomPrivate = await this.prisma.room.findMany({
            where: { type: 'private' },
        })

        let banned = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: {
                    where: { isBanned: true },
                    select: { roomId: true }
                }

            }
        })



        const r = roomUser.memberships.map(membership => membership.room);
        let filteredRoom = room.filter(item => !r.some(item2 => item2.id === item.id));
        filteredRoom = filteredRoom.filter(item => !roomPrivate.some(item2 => item2.id === item.id));
        filteredRoom = filteredRoom.filter(item => !banned.memberships.some(item2 => item2.roomId === item.id));

        return filteredRoom;
        // return banned.memberships;
    }
    async upadteChannel(id: number, roomId: number, type: string, password: string) {
        const room = await this.prisma.membership.findFirst({
            where: {
                roomId: roomId
            },
        });

        const time = await this.prisma.room.findFirst({
            where: { id: roomId },
            select: { updatedAt: true }
        })

        if (room.userId != id) {
            throw new UnauthorizedException()
        }
        else {
            if (type == "protected" && password) {

                await this.prisma.room.update({

                    where: {
                        id: roomId
                    },
                    data: {
                        type: type,
                        password: password
                    }
                });
            }
            else if (type == "protected" && !password) {

                throw new NotFoundException('You must password.');
            }
            else {
                await this.prisma.room.update({

                    where: {
                        id: roomId
                    },
                    data: {
                        type: type,
                        password: null
                    }
                });
            }
        }
        await this.prisma.room.update({
            where: { id: roomId },
            data: { updatedAt: time.updatedAt }
        })
        return room
    }


    private scheduleMuteExpirationCheck(id: number, timeMute: Date): void {
        const timeUntilExpiration = timeMute.getTime() - new Date().getTime();

        if (timeUntilExpiration > 0) {
            setTimeout(async () => {
                // Check if the mute time has expired and update the user's mute status
                const membership = await this.prisma.membership.findUnique({ where: { id: id } });
                if (membership && membership.timeMute && new Date() >= membership.timeMute) {
                    await this.prisma.membership.update({
                        where: {
                            id: id
                        },
                        data: {
                            timeMute: null
                        }
                    })
                }
            }, timeUntilExpiration);
        }
    }


    async setAdmin(roomId: number, participantId: number, item: string, duration: string) {

        console.log('ana hna asat =>', roomId, participantId, item, duration)
        let room = await this.prisma.room.findUnique({
            where: {
                id: roomId,
            },
            select: {
                Memberships: {
                    where: {
                        userId: participantId
                    },
                }
            }
        })
        const id = room.Memberships[0].id

        if (item == 'admin') {
            await this.prisma.membership.update({
                where: {
                    id: id
                },
                data: {
                    isAdmin: true
                }
            })
        }
        else if (item == 'kick') {
            await this.prisma.membership.delete({
                where: {
                    id: id
                },
            })
        }
        else if (item == 'banned') {
            await this.prisma.membership.update({
                where: {
                    id: id
                },
                data: {
                    isBanned: true
                }
            })
        }
        else if (item == 'no banned') {
            await this.prisma.membership.update({
                where: {
                    id: id
                },
                data: {
                    isBanned: false
                }
            })
        }
        else if (item == 'inAdmin') {
            await this.prisma.membership.update({
                where: {
                    id: id
                },
                data: {
                    isAdmin: false
                }
            })
        }

        else if (item == 'mute') {
            const currentTime = new Date();
            let timeMute: Date;
            switch (duration.toLowerCase()) {
                case '1min':
                    timeMute = new Date(currentTime.getTime() + 60 * 1000);
                    break;
                case '1h':
                    timeMute = new Date(currentTime.getTime() + 60 * 60 * 1000);
                    break;
                case '1day':
                    timeMute = new Date(currentTime.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case '1week':
                    timeMute = new Date(currentTime.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    throw new Error('Invalid duration');
            }
            await this.prisma.membership.update({
                where: {
                    id: id
                },
                data: {
                    timeMute: timeMute
                }
            })
            this.scheduleMuteExpirationCheck(id, timeMute);
        }


    }


    async LeavingRoom(userId: number, roomId: number) {
        let membership = await this.prisma.membership.findFirst({
            where: {
                roomId: roomId,
                userId: userId
            }

        })
        await this.prisma.membership.delete({
            where: {
                id: membership.id
            }
        })
   
    }


    async addParticipants(roomId, body) {
        let room = await this.prisma.room.findFirst({
            where: { id: roomId }
        })
        body.people.map(async (id) => {
            await this.prisma.membership.create({
                data: {
                    room: {
                        connect: {
                            id: room.id
                        }
                    },
                    user: {
                        connect: {
                            id: id
                        }
                    },
                    isOwner: false,
                    isAdmin: false,
                }
            });
        })

    }

    /******************************************************* Direct Message ****************************************************************/

    async sendDirectMessage(body, idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
        });
        if (!conversation) {
            await this.prisma.friendship.create({
                data: {
                    userAId: idSender,
                    userBId: idReceiver,
                    status: 'accepted', // You can set a status to track the request (e.g., 'pending', 'accepted', 'rejected')
                },
            });
            conversation = await this.prisma.conversation.create({
                data: {
                    type: 'direct',
                    participants: {
                        connect: [
                            {
                                id: idSender
                            },
                            {
                                id: idReceiver
                            },
                        ],
                    }
                }
            })
        }
        let status = await this.prisma.friendship.findFirst({
            where: {
                userAId: idSender,
                userBId: idReceiver,

            }
        })
        if (!status) {

            status = await this.prisma.friendship.findFirst({
                where: {
                    userAId: idReceiver,
                    userBId: idSender,

                }
            })

        }

        if ((status.status == "accepted")) {


            const msg = await this.prisma.message.create({
                data: {
                    content: body.content,
                    sender: {
                        connect: {
                            id: idSender
                        }
                    },
                    chat: {
                        connect: {
                            id: conversation.id
                        }
                    }
                }
            })
            await this.prisma.conversation.update({
                where: {
                    id: conversation.id
                },
                data: {
                    updatedAt: msg.createdAt
                }
            })
        }

    }

    async getConversationDirect(idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
            select: {
                messages: true
            }
        });
        if (!conversation)
            throw new NotFoundException('messages is empty')

        conversation.messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        return await conversation.messages;

    }


    async deleteConversationDirect(idSender: number, idReceiver: number) {
        let conversation = await this.prisma.conversation.findFirst({
            where: {
                type: 'direct',
                participants: {
                    every: {
                        id: {
                            in: [idSender, idReceiver]
                        },
                    },
                },
            },
            select: {
                id: true
            }
        });
        await this.prisma.conversation.delete({
            where: {
                id: conversation.id,
            }
        })
    }
    async statusChatTwoUser(idSender: number, idReceiver: number) {
        const existingFriendship = await this.prisma.friendship.findFirst({
            where: {
                userAId: idSender,

                userBId: idReceiver,
            },
        });
        const existingFriendship1 = await this.prisma.friendship.findFirst({
            where: {
                userAId: idReceiver,

                userBId: idSender,
            },
        });
        if (existingFriendship)
            return (existingFriendship)
        else if (existingFriendship1)
            return (existingFriendship1)

        else return 0;
    }

    async list_user_blocked_in_chat(userId: number) {
        // Find all friend requests with the specified status where the user is either the sender or the receiver
        const status = "blocked"
        const friendRequests = await this.prisma.friendship.findMany({
            where: {
                status,
                OR: [
                    {
                        userAId: userId,
                    },
                    {
                        userBId: userId,
                    },
                ],
            },
        });

        // Extract user IDs from the friend request records
        const friendUserIds = friendRequests.flatMap((request) => [
            request.userAId === userId ? request.userBId : request.userAId,
        ]);
        console.log(friendUserIds)
        if (!friendUserIds)
            return 0;
        return (friendUserIds)
    }
    async unblockChatTwoUser(idSender: number, idReceiver: number) {
        const friendRequest = await this.prisma.friendship.findFirst({
            where: {
                userAId: idSender,

                userBId: idReceiver,
            },
            include: {
                userA: true, // Include the sender of the request
                userB: true, // Include the receiver of the request
            }
        });
        if (friendRequest) {

            await this.prisma.friendship.update({
                where: {
                    id: friendRequest.id,
                },
                data: {
                    status: 'accepted',
                },
            });
        }
    }
    async blockChatTwoUser(idSender: number, idReceiver: number) {
        const existingFriendship = await this.prisma.friendship.findFirst({
            where: {
                userAId: idSender,

                userBId: idReceiver,
            },
        });
        const existingFriendship1 = await this.prisma.friendship.findFirst({
            where: {
                userAId: idReceiver,

                userBId: idSender,
            },
        });
        if (!existingFriendship && !existingFriendship1) {
            // Create a friend request in the database
            await this.prisma.friendship.create({
                data: {
                    userAId: idSender,

                    userBId: idReceiver,
                    status: 'blocked', // You can set a status to track the request (e.g., 'pending', 'accepted', 'rejected')
                },
            });
        }
        else {
            const friendRequest = await this.prisma.friendship.findFirst({
                where: {
                    userAId: idSender,

                    userBId: idReceiver,
                },
                include: {
                    userA: true, // Include the sender of the request
                    userB: true, // Include the receiver of the request
                }
            });
            const friendRequest1 = await this.prisma.friendship.findFirst({
                where: {
                    userAId: idReceiver,

                    userBId: idSender,
                },
                include: {
                    userA: true, // Include the sender of the request
                    userB: true, // Include the receiver of the request
                },
            });
            if (friendRequest && friendRequest.status !== 'blocked') {

                await this.prisma.friendship.update({
                    where: {
                        id: friendRequest.id,
                    },
                    data: {
                        status: 'blocked',
                    },
                });
            }
            else if (friendRequest1 && friendRequest1.status !== 'blocked') {

                await this.prisma.friendship.delete({
                    where: {
                        id: friendRequest1.id,
                    }
                });
                await this.prisma.friendship.create({
                    data: {
                        userAId: idSender,

                        userBId: idReceiver,
                        status: 'blocked', // You can set a status to track the request (e.g., 'pending', 'accepted', 'rejected')
                    },
                });
            }
        }
    }

    async getConversationListDirect(idUser: number, type: string) {
        let conversation = await this.prisma.conversation.findMany({

            where: {
                type: type,
                participants: {
                    some: {
                        id: idUser,
                    },
                },
            },
            select: {
                participants: {
                    select: {
                        id: true,
                        foto_user: true,
                        username: true,
                        level: true,
                        won: true,
                    }
                },
                updatedAt: true,
            }
        });
        const status = "blocked"
        const friendRequests = await this.prisma.friendship.findMany({
            where: {
                status,
                OR: [
                    {
                        userAId: idUser,
                    },
                    {
                        userBId: idUser,
                    },
                ],
            },
        });

        // Extract user IDs from the friend request records
        const friendUserIds = friendRequests.flatMap((request) => [
            request.userAId === idUser ? request.userBId : request.userAId,
        ]);



        const result = conversation.map((item) => {
            const updatedParticipants = item.participants.filter((participant) => participant.id !== idUser);

            return {
                updatedAt: item.updatedAt,
                id: updatedParticipants.length > 0 ? updatedParticipants[0].id : null,
                username: updatedParticipants.length > 0 ? updatedParticipants[0].username : null,
                foto_user: updatedParticipants.length > 0 ? updatedParticipants[0].foto_user : null,
            };
        });
        const result1 = result
            .filter((item) => !friendUserIds.includes(item.id))
            .map((item) => ({
                updatedAt: item.updatedAt,
                id: item.id,
                username: item.username,
                foto_user: item.foto_user,
                // Add other properties you want to include in the modified object
            }));

        result1.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
        return await result1
    }
}