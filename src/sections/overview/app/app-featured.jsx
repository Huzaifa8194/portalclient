"use client"

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
    // Changed background to match the green color of the button (primary color)
    <Card sx={{ bgcolor: "primary.main", ...sx }} {...other}>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{ top: 16, left: 16, position: "absolute", color: "common.white" }}
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
  // Determine the image source based on the title
  const getImageSource = (title) => {
    if (title.includes("Family Reunification")) {
      return "./family.png"
    }
    if (title.includes("Worldwide Visit Visas")) {
      return "./visa.png"
    }
    if (title.includes("Business & Work Permit")) {
      return "./permit.png"
    }
    return item.coverUrl || "/placeholder.svg"
  }

  const imageSource = getImageSource(item.title)

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
        <Button
          variant="contained"
          color="primary"
          onClick={onButtonClick}
          sx={{
            my: { xs: 1, sm: 1, lg: 1, xl: 5 },
          }}
        >
          {item.title === "Business & Work Permit Not just an application form" ? "Learn More" : "Apply Now"}
        </Button>
      </Box>

      {/* Full image coverage with object-fit: cover and uniform black overlay across the entire image */}
      <Image
        alt={item.title}
        src={imageSource || "/placeholder.svg"}
        slotProps={{
          overlay: {
            background: (theme) => `${varAlpha(theme.vars.palette.common.blackChannel, 0.7)}`, // Uniform black overlay with 30% opacity
          },
        }}
        sx={{
          width: 1,
          height: { xs: 288, xl: 320 },
          objectFit: "cover", // Ensures full image coverage
        }}
      />
    </Box>
  )
}

