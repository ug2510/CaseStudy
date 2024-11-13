import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const BondEdit = ({ pfCreditRatings = [] }) => {
  const { control, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({ mode: 'onChange' });
  const [isCouponEntered, setIsCouponEntered] = useState(false);

  const handleFormSubmit = (data) => {
    console.log("Form data submitted:", data);
  };

  return (
    <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 3, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          
          <TextField
            label="Security Name"
            variant="outlined"
            disabled
            fullWidth
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors?.description?.message}
              />
            )}
          />

          <Controller
            name="coupon"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Coupon"
                variant="outlined"
                fullWidth
                type="number"
                onChange={(e) => {
                  field.onChange(e);
                  setIsCouponEntered(e.target.value !== '');
                }}
                helperText={isCouponEntered ? 'Coupon rate applied' : ''}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Callable Flag</InputLabel>
            <Controller
              name="callableFlag"
              control={control}
              defaultValue=""
              rules={{ required: 'Callable Flag is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Callable Flag"
                  error={!!errors.callableFlag}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              )}
            />
            {errors.callableFlag && <FormHelperText error>{errors.callableFlag.message}</FormHelperText>}
          </FormControl>

          {/* Maturity - Disabled */}
          <TextField
            label="Maturity"
            variant="outlined"
            disabled
            fullWidth
          />

          {/* Penultimate Coupon Date - Editable Date */}
          <Controller
            name="penultimateCouponDate"
            control={control}
            defaultValue=""
            rules={{ required: 'Penultimate Coupon Date is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Penultimate Coupon Date"
                variant="outlined"
                fullWidth
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.penultimateCouponDate}
                helperText={errors?.penultimateCouponDate?.message}
              />
            )}
          />

          {/* PF Credit Rating - Dropdown */}
          <FormControl fullWidth>
            <InputLabel>PF Credit Rating</InputLabel>
            <Controller
              name="pfCreditRating"
              control={control}
              defaultValue=""
              rules={{ required: 'PF Credit Rating is required' }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="PF Credit Rating"
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

          {/* Ask Price - Numeric validation */}
          <Controller
            name="askPrice"
            control={control}
            defaultValue=""
            rules={{
              required: 'Ask Price is required',
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ask Price"
                variant="outlined"
                fullWidth
                error={!!errors.askPrice}
                helperText={errors?.askPrice?.message}
                type="number"
              />
            )}
          />

          {/* Bid Price - Numeric validation */}
          <Controller
            name="bidPrice"
            control={control}
            defaultValue=""
            rules={{
              required: 'Bid Price is required',
              pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Bid Price"
                variant="outlined"
                fullWidth
                error={!!errors.bidPrice}
                helperText={errors?.bidPrice?.message}
                type="number"
              />
            )}
          />

          {/* Update Button */}
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

export default BondEdit;
