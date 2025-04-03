import Autoplay from "embla-carousel-autoplay"
import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router-dom"

import { varAlpha } from "src/theme/styles"

import { Image } from "src/components/image"
import { Carousel, useCarousel, CarouselDotButtons, CarouselArrowBasicButtons } from "src/components/carousel"

// ----------------------------------------------------------------------
export function AppFeatured({ list, sx, ...other }) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 8000 })])
  const navigate = useNavigate()

  const getPath = (title) => {
    switch (title) {
      case "Family Reunification Spouse, Children & Parents EU Residence":
        console.log("Family Reunification")
        return "/dashboard/family-reunification"
      case "Worldwide Visit Visas Apply Now! Global Visa Services":
        console.log("Visit Visa")
        return "/dashboard/visit-visa"
      case "Business & Work Permit Not just an application form":
        console.log("Work Permit")
        return "/dashboard/work-visa"
      default:
        return "#"
    }
  }

  const handleButtonClick = (path) => {
    console.log("Navigating to:", path)
    navigate(path)
  }

  return (
    <Card sx={{ bgcolor: "common.black",...sx }} {...other}>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ top: 16, left: 16, position: "absolute", color: "primary.light" }}
      />

      <CarouselArrowBasicButtons
        {...carousel.arrows}
        options={carousel.options}
        sx={{ top: 8, right: 8, position: "absolute", color: "common.white" }}
      />

      <Carousel carousel={carousel}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} onButtonClick={() => handleButtonClick(getPath(item.title))} />
        ))}
      </Carousel>
    </Card>
  )
}

// ----------------------------------------------------------------------

function CarouselItem({ item, onButtonClick, ...other }) {
  return (
    <Box sx={{ width: 1, position: "relative", ...other }}>
      <Box
        sx={{
          p: 3,
          gap: 1,
          width: 1,
          bottom: 0,
          zIndex: 9,
          display: "flex",
          position: "absolute",
          color: "common.white",
          flexDirection: "column",
        }}
      >
        <Link color="inherit" underline="none" variant="h6" sx={{ wordWrap: "break-word" }}>
          {item.title}
        </Link>

        <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
          {item.description}
        </Typography>
        <Button variant="contained" color="primary" onClick={onButtonClick}
        sx={{
          my:{ xs: 1, sm: 1,lg: 1, xl: 5 },
         
        }}>
          {item.title==="Business & Work Permit Not just an application form"?"Learn More":"Apply Now"}
        </Button>
      </Box>

      <Image
        alt={item.title}
        src={item.coverUrl || "/placeholder.svg"}
        slotProps={{
          overlay: {
            background: (theme) =>
              `linear-gradient(to bottom, ${varAlpha(theme.vars.palette.common.blackChannel, 0)} 0%, ${theme.vars.palette.common.black} 75%)`,
          },
        }}
        sx={{
          width: 1,
          height: { xs: 288, xl: 320 },
        }}
      />
    </Box>
  )
}

