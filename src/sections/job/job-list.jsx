"use client"

import { useState, useEffect, useCallback } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"
import { useRouter } from "src/routes/hooks"
import { paths } from "src/routes/paths"
import { useAuthContext } from "src/auth/hooks"
import { endpoints } from "src/utils/axios"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { JobItem } from "./job-item"

export function JobList() {
  const navigate = useNavigate();
  const router = useRouter()
  const auth = useAuthContext()
  const [familyMembers, setFamilyMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        setIsLoading(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
          throw new Error("No authentication token found")
        }

        console.log("API URL:", endpoints.management.getCoApplicant)
        const response = await axios.get("https://api.swedenrelocators.se/api/client/familyMember/list", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          validateStatus: (status) => status >= 200 && status < 300,
        })
        if (response.data && Array.isArray(response.data.data)) {
          setFamilyMembers(response.data.data)
        } else {
          console.error("Unexpected API response structure:", response.data)
          setError("Unexpected data format received from the server.")
        }
        setError(null)
      } catch (err) {
        console.error("Error fetching family members:", err)
        if (err.response) {
          console.log("Error response status:", err.response.status)
          console.log("Error response data:", err.response.data)
        }
        setError("Failed to fetch family members. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFamilyMembers()
  }, [])

  const handleView = useCallback(
    (member) => {
      router.push({
        pathname: paths.dashboard.job.details(member.id),
        query: { memberData: JSON.stringify(member) },
      })
    },
    [router],
  )

  const handleEdit = (member) => {
    console.log(member); // Log the selected member
    navigate(paths.dashboard.job.edit(member.id),  { state: { member } });
  };
  

  const handleDelete = useCallback((id) => {
    console.info("DELETE", id)
  }, [])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    )
  }

  return (
    <>
      <Typography
        variant="caption"
        sx={{
          mt: 3,
          mb: 3,
          mx: "auto",
          display: "block",
          textAlign: "left",
          color: "text.secondary",
        }}
      >
        Kindly add your family members here who are going to apply with you now or they are willing to apply in future.
      </Typography>

      {familyMembers.length === 0 ? (
        <Typography align="center">No family members found. Add some to get started!</Typography>
      ) : (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {familyMembers.map((member) => (
            <JobItem
              key={member.id}
              job={{
                id: member.id,
                company: {
                  name: member.name,
                  logo: member.profile_picture || "/placeholder.svg",
                },
                relation: member.relationship,
                nic: member.nic,
                dob: member.dob,
                passport: member.passport_no,
              }}
              onView={() => handleView(member)}
              onEdit={() => handleEdit(member)}
              onDelete={() => handleDelete(member.id)}
            />
          ))}
        </Box>
      )}
    </>
  )
}

