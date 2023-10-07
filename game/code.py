import sys
import math
import numpy as np

# Auto-generated code below aims at helping you parse
# the standard input according to the problem statement.
chessrow = 8
chessclum = 8
ferstRow = [(n + 1) % (2) for n in range(0,chessrow)]
secondRow = [n % 2 for n in range(0,chessrow)]
ChessValid = np.array([ferstRow if n % 2 == 1 else secondRow for n in range(0,chessclum) ])

n = int(input())
for i in range(n):
    row, col, is_white = [int(j) for j in input().split()]
    paintingRow = row
    paintingClum = col
    flag = is_white
    painFerstRow =  [n % 2 for n in range(0,paintingRow)]
    painSecondRow =[(n + 1) % (2) for n in range(0,paintingRow)]
    painting = np.array([painFerstRow if (n + (paintingClum + 1) % 2 + (not flag)) % 2 == 1 else painSecondRow for n in range(0,paintingClum) ])
    # display(painting)
    a = 0
    for i in range(0,paintingRow):
      for j in range(0,paintingClum):
        text = painting[j:j + 8, i:i + 8]
        if (np.array_equal(text,ChessValid)):
           a +=1
