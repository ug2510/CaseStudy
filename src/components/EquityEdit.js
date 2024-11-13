import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const EquityEdit = ({ pfCreditRatings = [], currencies = [] }) => {
  const [formData, setFormData] = useState(null);  
  const { control, handleSubmit, formState: { errors, isDirty, isValid }, setValue } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const initialData = {
      securityName: '',
      description: '',
      pricingCurrency: '',
      totalSharesOutstanding: '',
      openPrice: '',
      closePrice: '',
      dividendDeclaredDate: '',
      pfCreditRating: '',
    };
    setFormData(initialData);
  }, []);

  const handleFormSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 3, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <TextField
            label="Security Name"
            variant="outlined"
            value={formData?.securityName}
            disabled
            fullWidth
          />

          <Controller
            name="description"
            control={control}
            defaultValue={formData?.description}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors?.description?.message}
                onChange={handleChange}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Pricing Currency</InputLabel>
            <Controller
              name="pricingCurrency"
              control={control}
              defaultValue={formData?.pricingCurrency}
              rules={{ required: 'Currency is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Pricing Currency"
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  error={!!errors.pricingCurrency}
                >
                  {currencies.map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.pricingCurrency && <FormHelperText error>{errors.pricingCurrency.message}</FormHelperText>}
          </FormControl>

          <Controller
            name="totalSharesOutstanding"
            control={control}
            defaultValue={formData?.totalSharesOutstanding}
            rules={{
              required: 'Total Shares Outstanding is required',
              pattern: { value: /^\d+$/, message: 'Must be a valid number' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Shares Outstanding"
                variant="outlined"
                fullWidth
                error={!!errors.totalSharesOutstanding}
                helperText={errors?.totalSharesOutstanding?.message}
                onChange={handleChange}
                type="number"
              />
            )}
          />

          <Controller
            name="openPrice"
            control={control}
            defaultValue={formData?.openPrice}
            rules={{
              required: 'Open Price is required',
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Open Price"
                variant="outlined"
                fullWidth
                error={!!errors.openPrice}
                helperText={errors?.openPrice?.message}
                onChange={handleChange}
                type="number"
              />
            )}
          />

          <Controller
            name="closePrice"
            control={control}
            defaultValue={formData?.closePrice}
            rules={{
              required: 'Close Price is required',
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Close Price"
                variant="outlined"
                fullWidth
                error={!!errors.closePrice}
                helperText={errors?.closePrice?.message}
                onChange={handleChange}
                type="number"
              />
            )}
          />

          <Controller
            name="dividendDeclaredDate"
            control={control}
            defaultValue={formData?.dividendDeclaredDate}
            rules={{ required: 'Dividend Declared Date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Dividend Declared Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.dividendDeclaredDate}
                helperText={errors?.dividendDeclaredDate?.message}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>PF Credit Rating</InputLabel>
            <Controller
              name="pfCreditRating"
              control={control}
              defaultValue={formData?.pfCreditRating}
              rules={{ required: 'PF Credit Rating is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="PF Credit Rating"
                  onChange={(e) => {
                    field.onChange(e);
                    handleChange(e);
                  }}
                  error={!!errors.pfCreditRating}
                >
                  {pfCreditRatings.map((rating) => (
                    <MenuItem key={rating} value={rating}>
                      {rating}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.pfCreditRating && <FormHelperText error>{errors.pfCreditRating.message}</FormHelperText>}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || !isValid}
          >
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EquityEdit;
