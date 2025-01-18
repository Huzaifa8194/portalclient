import React, { useState, useEffect, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Box,
  Card,
  Stack,
  Alert,
  MenuItem,
  Typography,
  TextField,
  Button,
  Container,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Sample data (replace with actual data in a real application)
const highRiskCountries = ['Country1', 'Country2', 'Country3', 'Country4', 'Country5'];
const bannedCountries = ['BannedCountry1', 'BannedCountry2', 'BannedCountry3'];
const allCountries = ['USA', 'UK', 'Germany', 'France', 'Japan', 'Australia', 'Canada', 'Italy', 'Spain', 'Netherlands'];
const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK', 'NZD'];

const schema = z.object({
  fromCountry: z.string().min(1, 'From Country is required'),
  toCountry: z.string().min(1, 'To Country is required'),
  isHomeCountry: z.string().min(1, 'This field is required'),
  fromCurrency: z.string().min(1, 'From Currency is required'),
  toCurrency: z.string().min(1, 'To Currency is required'),
  hasDocuments: z.string().min(1, 'This field is required'),
  canVerifySavings: z.string().min(1, 'This field is required'),
  isEmployed: z.string().min(1, 'This field is required'),
  monthlyIncome: z.string().min(1, 'Monthly income range is required'),
  soldProperty: z.string().min(1, 'This field is required'),
  transferTimeframe: z.string().min(1, 'Transfer timeframe is required'),
  hasBankAccount: z.string().min(1, 'This field is required'),
  transferAmount: z.string().min(1, 'Transfer amount is required'),
  savingsOwnership: z.string().min(1, 'Savings ownership information is required'),
});

export default function PostNewEditForm() {
  const [showHighRiskWarning, setShowHighRiskWarning] = useState(false);
  const [showBannedWarning, setShowBannedWarning] = useState(false);

  const defaultValues = useMemo(
    () => ({
      fromCountry: '',
      toCountry: '',
      isHomeCountry: '',
      fromCurrency: '',
      toCurrency: '',
      hasDocuments: '',
      canVerifySavings: '',
      isEmployed: '',
      monthlyIncome: '',
      soldProperty: '',
      transferTimeframe: '',
      hasBankAccount: '',
      transferAmount: '',
      savingsOwnership: '',
    }),
    []
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const watchedFields = watch(['fromCountry', 'toCountry']);

  useEffect(() => {
    const [fromCountry, toCountry] = watchedFields;
    const isHighRisk = highRiskCountries.includes(fromCountry) || highRiskCountries.includes(toCountry);
    const isBanned = bannedCountries.includes(fromCountry) || bannedCountries.includes(toCountry);
    setShowHighRiskWarning(isHighRisk);
    setShowBannedWarning(isBanned);
  }, [watchedFields]);

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form data submitted:', data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Card sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Money Transfer Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: 'grid',
              gap: 4,
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            }}
          >
            {showHighRiskWarning && (
              <Alert severity="warning" sx={{ gridColumn: '1 / -1', mb: 2 }}>
                You are either transferring to or from a high-risk country according to the list provided by our partner, which could potentially result in extended processing times for transferring money to your intended destination.
              </Alert>
            )}

            {showBannedWarning && (
              <Alert severity="error" sx={{ gridColumn: '1 / -1', mb: 2 }}>
                Unfortunately, you are either transferring to or from a country that is currently banned, and our partner may not be able to assist you at this time.
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  {allCountries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  {allCountries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="fromCurrency"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="From Currency"
                  select
                  error={!!errors.fromCurrency}
                  helperText={errors.fromCurrency?.message}
                  fullWidth
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="toCurrency"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="To Currency"
                  select
                  error={!!errors.toCurrency}
                  helperText={errors.toCurrency?.message}
                  fullWidth
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
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
                  sx={{ '& .MuiInputBase-root': { height: '56px' } }}
                >
                  <MenuItem value="myself">Myself</MenuItem>
                  <MenuItem value="myself-partner">Myself and Partner</MenuItem>
                  <MenuItem value="myself-parents">Myself and Parents</MenuItem>
                  <MenuItem value="myself-family">Myself and other Family member</MenuItem>
                </TextField>
              )}
            />
          </Box>

          <Stack 
            direction="row" 
            justifyContent="flex-end" 
            sx={{ 
              mt: 4,
              gap: 2 
            }}
          >
            <Button
              type="button"
              color="inherit"
              variant="outlined"
              size="large"
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              size="large"
            >
              Submit
            </LoadingButton>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}

