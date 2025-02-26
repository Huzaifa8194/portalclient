import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import Avatar from "@mui/material/Avatar"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import ListItemText from "@mui/material/ListItemText"
import Button from "@mui/material/Button"

import { varAlpha } from "src/theme/styles"
import { AvatarShape } from "src/assets/illustrations"
import { Image } from "src/components/image"

import cap1 from "src/assets/images/cap1.PNG"
import cap2 from "src/assets/images/cap2.PNG"
import cap3 from "src/assets/images/cap3.PNG"

export function PricingCardUpdated({ card }) {
    const { subscription, price, caption, labelAction } = card

    const getHref = (labelaction) => {
        switch (labelaction) {
            case "Choose Private":
                return "/auth/jwt/sign-up-options"
            case "Choose Companies":
                return "/auth/jwt/sign-up-company"
            case "Choose Partners":
                return "/auth/jwt/sign-up-partner"
            default:
                return "#" // Fallback to prevent invalid links
        }
    }

   
    const avatarLetter = price ? price.charAt(0) : "P"

    // Select the appropriate image based on the price
    const getImage = () => {
        switch (price) {
            case "Private":
                return cap1
            case "Companies":
                return cap2
            case "Partners":
                return cap3
            default:
                return cap1 // Default to cap1 if no match
        }
    }

    return (
        <Card
            sx={{
                textAlign: "center",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:hover": {
                    transform: "translateY(-4px)",
                    transition: "transform 0.2s ease-in-out",
                },
            }}
        >

            <Box sx={{ position: "relative", height: 280 }}>
                <AvatarShape
                    sx={{
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        mx: "auto",
                        bottom: -26,
                        position: "absolute",
                    }}
                />

                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        zIndex: 11,
                        left: 0,
                        right: 0,
                        bottom: -32,
                        mx: "auto",
                        position: "absolute",
                        bgcolor: "black"
                    }}
                >
                    {avatarLetter}
                </Avatar>

                <Image
                    src={getImage() || "/placeholder.svg"}
                    alt={price}
                    ratio="16/9"
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "8px"
                    }} 
                    slotProps={{
                        overlay: {
                            bgcolor: (theme) => varAlpha(theme.palette.common.blackChannel, 0.05), // Even lighter overlay
                        },
                    }}
                />
            </Box>

            <ListItemText
                sx={{ mt: 8, mb: 2 }}
                primary={
                    <Typography
                        component="a"
                        variant="subtitle1"
                        sx={{
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "inherit" // Keeps default text color
                        }}
                        href={getHref(labelAction)}
                    >
                        {price || "Account Type"}
                    </Typography>
                }
                secondary={caption || "Description"}
                secondaryTypographyProps={{ component: "span", mt: 0.5 }}
            />


            <Divider sx={{ borderStyle: "dashed" }} />

            <Box sx={{ p: 3 }}>
                <Button fullWidth size="large" variant="contained" href={getHref(labelAction)}>
                    {labelAction}
                </Button>
            </Box>
        </Card>
    )
}
