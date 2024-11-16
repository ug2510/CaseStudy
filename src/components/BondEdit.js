import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText, Box } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import pfCreditRatingsData from '../assets/utility-state-serve.json'; 
import { format } from "date-fns";
import axios from 'axios';
const BondEdit = ({ initialData ,onClose}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue, 
  } = useForm({ mode: "onChange" });
  const [isCouponEntered, setIsCouponEntered] = useState(false);
  const [pfCreditRatings, setPfCreditRatings] = useState([]);
console.log(initialData); 

  useEffect(() => {


    if (pfCreditRatingsData?.PF_Credit_Rating) {
      setPfCreditRatings(pfCreditRatingsData.PF_Credit_Rating);
    }
     if (initialData) {setValue("Security Name", initialData["security Name"]);
    setValue("description", initialData["security Description"]);
    setValue("coupon", initialData["couponRate"]);
    const callableFlagValue = initialData["isCallable"] ? "Yes" : "No";
    setValue("callableFlag", callableFlagValue);
     const maturityDate = initialData["maturityDate"]
       ? format(new Date(initialData["maturityDate"]), "yyyy-MM-dd")
       : "";
    setValue("maturity", maturityDate);
    const penultimateCouponDate = initialData["penultimateCouponDate"]
      ? format(new Date(initialData["penultimateCouponDate"]), "yyyy-MM-dd")
      : "";
    setValue("penultimateCouponDate", penultimateCouponDate);
    
    setValue("pfCreditRating", initialData["pf Credit Rating"]);
    setValue("askPrice", initialData["askPrice"]);
     setValue("bidPrice", initialData["bidPrice"]);
     }

  }, [initialData, setValue]);

  const handleFormSubmit = async  (data) => {
    const sid = initialData?.sid;
    if (!sid) {
      console.error("SID is missing in initial data.");
      return;
    }
    const payload = {
      description: data.description,
      couponRate: data.coupon,
      isCallable: data.callableFlag === "Yes",
      penultimateCouponDate: new Date(data.penultimateCouponDate).toISOString(),
      askPrice: data.askPrice,
      bidPrice: data.bidPrice,
      pfCreditRating: data.pfCreditRating,
    };
    const apiUrl = `https://localhost:7109/api/BondCsv/updateBond${sid}`;
    try {
      const response = await axios.put(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 204) {
        alert("Equity updated successfully!");
        onClose();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update equity. Please try again.");
    }
    console.log("Form data submitted:", data);
  };

  const textFieldStyles = { textAlign: "left" };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: 600,
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Controller
            name="Security Name"
            control={control}
            
            render={({ field }) => (
              <TextField
                {...field}
                label="Security Name"
                variant="outlined"
                disabled // This makes the field immutable (non-editable)
                fullWidth
               
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors?.description?.message}
                InputProps={{ style: textFieldStyles }}
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
                  setIsCouponEntered(e.target.value !== "");
                }}
                helperText={isCouponEntered ? "Coupon rate applied" : ""}
                InputProps={{ style: textFieldStyles }}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>Callable Flag</InputLabel>
            <Controller
              name="callableFlag"
              control={control}
              defaultValue=""
              rules={{ required: "Callable Flag is required" }}
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
            {errors.callableFlag && (
              <FormHelperText error>
                {errors.callableFlag.message}
              </FormHelperText>
            )}
          </FormControl>

          <Controller
            name="maturity"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Maturity"
                variant="outlined"
                disabled
                fullWidth
                 // Ensure the field value is set correctly
                InputProps={{ style: textFieldStyles }}
              />
            )}
          />

          <Controller
            name="penultimateCouponDate"
            control={control}
            defaultValue=""
            rules={{ required: "Penultimate Coupon Date is required" }}
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
                InputProps={{ style: textFieldStyles }}
              />
            )}
          />

          <FormControl fullWidth>
            <InputLabel>PF Credit Rating</InputLabel>
            <Controller
              name="pfCreditRating"
              control={control}
              defaultValue=""
              rules={{ required: "PF Credit Rating is required" }}
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
            {errors.pfCreditRating && (
              <FormHelperText error>
                {errors.pfCreditRating.message}
              </FormHelperText>
            )}
          </FormControl>

          <Controller
            name="askPrice"
            control={control}
            defaultValue=""
            rules={{
              required: "Ask Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
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
                InputProps={{ style: textFieldStyles }}
              />
            )}
          />

          <Controller
            name="bidPrice"
            control={control}
            defaultValue=""
            rules={{
              required: "Bid Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
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
                InputProps={{ style: textFieldStyles }}
              />
            )}
          />

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
