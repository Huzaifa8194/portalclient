import React from "react"
import { Controller } from "react-hook-form"
import { Box, Alert, MenuItem, TextField, Autocomplete, Chip } from "@mui/material"
import { FlagIcon } from "src/components/iconify"
import { countryCodeMapping } from "src/_mock/country"

export function MoneyForm({ control, errors, showHighRiskWarning, showBannedWarning, allCountries, currencies, watch, setValue }) {
  const CurrencySelect = ({ name, label, error }) => {
    const values = watch(name) || []
    
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            options={currencies}
            value={values}
            onChange={(_, newValue) => {
              setValue(name, newValue, { shouldValidate: true })
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                error={!!error}
                helperText={error?.message}
                fullWidth
                sx={{ "& .MuiInputBase-root": { height: "auto", minHeight: "56px" } }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={option}
                  label={option}
                  {...getTagProps({ index })}
                  sx={{
                    bgcolor: 'success.light',
                    color: 'success.contrastText',
                    '& .MuiChip-deleteIcon': {
                      color: 'success.contrastText',
                      opacity: 0.7,
                      '&:hover': {
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))
            }
            sx={{
              width: "100%",
              mb: 3,
            }}
          />
        )}
      />
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
      }}
    >
      {showHighRiskWarning && (
        <Alert severity="warning" sx={{ gridColumn: "1 / -1", mb: 2 }}>
          You are either transferring to or from a high-risk country according to the list provided by our partner,
          which could potentially result in extended processing times for transferring money to your intended
          destination.
        </Alert>
      )}

      {showBannedWarning && (
        <Alert severity="error" sx={{ gridColumn: "1 / -1", mb: 2 }}>
          Unfortunately, you are either transferring to or from a country that is currently banned, and our partner may
          not be able to assist you at this time.
        </Alert>
      )}

      <Controller
        name="fromCountry"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="From Country"
            select
            error={!!errors.fromCountry}
            helperText={errors.fromCountry?.message}
            fullWidth
            sx={{ "& .MuiInputBase-root": { height: "56px" } }}
          >
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {countryCodeMapping[country] && <FlagIcon code={countryCodeMapping[country]} sx={{ mr: 1 }} />}
                  {country}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="toCountry"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="To Country"
            select
            error={!!errors.toCountry}
            helperText={errors.toCountry?.message}
            fullWidth
            sx={{ "& .MuiInputBase-root": { height: "56px" } }}
          >
            {allCountries.map((country) => (
              <MenuItem key={country} value={country}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {countryCodeMapping[country] && <FlagIcon code={countryCodeMapping[country]} sx={{ mr: 1 }} />}
                  {country}
                </Box>
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="isHomeCountry"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Is the first country your home country and the other country where you are relocating?"
            select
            error={!!errors.isHomeCountry}
            helperText={errors.isHomeCountry?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
              
            }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Box sx={{ gridColumn: "1 / -1" , mb: -3}}>
        <CurrencySelect
          name="fromCurrencies"
          label="From Currency"
          error={errors.fromCurrencies}
        />
      </Box>

      <Box sx={{ gridColumn: "1 / -1" ,mb: -3}}>
        <CurrencySelect
          name="toCurrencies"
          label="To Currency"
          error={errors.toCurrencies}
        />
      </Box>

      <Controller
        name="hasDocuments"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Do you have all the necessary documents to prove that the available money is declared in your home country?"
            select
            error={!!errors.hasDocuments}
            helperText={errors.hasDocuments?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="canVerifySavings"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Can you provide evidence to verify the source of your savings?"
            select
            error={!!errors.canVerifySavings}
            helperText={errors.canVerifySavings?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="isEmployed"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Are you currently employed?"
            select
            error={!!errors.isEmployed}
            helperText={errors.isEmployed?.message}
            fullWidth
            sx={{ "& .MuiInputBase-root": { height: "56px" } }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="monthlyIncome"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="What is your monthly income range?"
            select
            error={!!errors.monthlyIncome}
            helperText={errors.monthlyIncome?.message}
            fullWidth
            sx={{ "& .MuiInputBase-root": { height: "56px" } }}
          >
            <MenuItem value="0-1000">0-1000 EUR</MenuItem>
            <MenuItem value="1000-50000">1000-50000 EUR</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="soldProperty"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Other than your savings, have you recently sold any house/property for this relocation?"
            select
            error={!!errors.soldProperty}
            helperText={errors.soldProperty?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="transferTimeframe"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="How soon do you need this money transferred to your desired country?"
            select
            error={!!errors.transferTimeframe}
            helperText={errors.transferTimeframe?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="asap">As soon as possible</MenuItem>
            <MenuItem value="1-3">1-3 Months</MenuItem>
            <MenuItem value="3-6">3-6 Months</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="hasBankAccount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Do you already have an active bank account in the country you plan to relocate to?"
            select
            error={!!errors.hasBankAccount}
            helperText={errors.hasBankAccount?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="transferAmount"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="What amount do you wish to transfer?"
            select
            error={!!errors.transferAmount}
            helperText={errors.transferAmount?.message}
            fullWidth
            sx={{ "& .MuiInputBase-root": { height: "56px" } }}
          >
            <MenuItem value="0-1000">0-1000 EUR</MenuItem>
            <MenuItem value="1000000+">1 million EUR or more</MenuItem>
          </TextField>
        )}
      />

      <Controller
        name="savingsOwnership"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Is this money from your savings alone, or does it include savings from other family members?"
            select
            error={!!errors.savingsOwnership}
            helperText={errors.savingsOwnership?.message}
            fullWidth
            sx={{
              "& .MuiInputBase-root": { height: "56px" },
              gridColumn: { xs: "1", md: "1 / -1" },
            }}
          >
            <MenuItem value="myself">Myself</MenuItem>
            <MenuItem value="myself-partner">Myself and Partner</MenuItem>
            <MenuItem value="myself-parents">Myself and Parents</MenuItem>
            <MenuItem value="myself-family">Myself and other Family member</MenuItem>
          </TextField>
        )}
      />
    </Box>
  )
}
