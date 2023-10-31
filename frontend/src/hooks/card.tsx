import { useContext } from "react"
import ThemeContextt from "./themeContextts"
const Card = () => {
    const theme = useContext(ThemeContextt)
    return (
        <div>
            {theme}
        </div>
    )
}

export default Card