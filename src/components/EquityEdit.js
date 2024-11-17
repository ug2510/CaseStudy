import React, { useEffect } from "react";
import { format } from "date-fns";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import pfCreditRatingsData from "../assets/utility-state-serve.json";

const EquityEdit = ({ initialData, onClose, currencies = [], onUpdate }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData["declared Date"]
        ? format(new Date(initialData["declared Date"]), "yyyy-MM-dd")
        : "";

      setValue("dividendDeclaredDate", formattedDate);
      setValue("securityName", initialData["security Name"]);
      setValue("description", initialData["security Description"]);
      setValue("pricingCurrency", initialData["price Currency"]);
      setValue("totalSharesOutstanding", initialData["shares Outstanding"]);
      setValue("openPrice", initialData["open Price"]);
      setValue("closePrice", initialData["close Price"]);
      setValue("pfCreditRating", initialData["pf Credit Rating"]);
    }
  }, [initialData, setValue]);

  // const handleFormSubmit = async (data) => {
  //   const sid = initialData?.sid;
  //   if (!sid) {
  //     return;
  //   }
  //   const payload = {
  //     description: data.description,
  //     sharesOutstanding: parseInt(data.totalSharesOutstanding, 10),
  //     priceCurrency: data.pricingCurrency,
  //     openPrice: parseFloat(data.openPrice),
  //     closePrice: parseFloat(data.closePrice),
  //     dividendDeclaredDate: new Date(data.dividendDeclaredDate).toISOString(),
  //     pfCreditRating: data.pfCreditRating,
  //   };

  //   const apiUrl = `https://localhost:7109/api/EquityCsv/updateEquity${sid}`;

  //   try {
  //     const response = await axios.put(apiUrl, payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200 || response.status === 204) {
  //       alert("Equity updated successfully!");
  //       onClose();
  //     }
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     alert("Failed to update equity. Please try again.");
  //   }
  // };

  const handleFormSubmit = async (data) => {
    const sid = initialData?.sid;
    if (!sid) {
      return;
    }

    const payload = {
      description: data.description,
      sharesOutstanding: parseInt(data.totalSharesOutstanding, 10),
      priceCurrency: data.pricingCurrency,
      openPrice: parseFloat(data.openPrice),
      closePrice: parseFloat(data.closePrice),
      dividendDeclaredDate: new Date(data.dividendDeclaredDate).toISOString(),
      pfCreditRating: data.pfCreditRating,
    };

    const apiUrl = `https://localhost:7109/api/EquityCsv/updateEquity${sid}`;

    try {
      const response = await axios.put(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 204) {
        alert("Equity updated successfully!");

        // Call the parent component's update function
        if (onUpdate) {
          onUpdate(); 
        }

        onClose();
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update equity. Please try again.");
    }
  };

  const currencyList = currencies.length
    ? currencies
    : ["USD", "KRW", "GBP", "EUR"];
  const uniqueCurrencies = [...new Set(currencyList)];

  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 5,
        borderRadius: 2,
        boxShadow: 3,
        width: "80%",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} sx={{ maxWidth: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Controller
            name="securityName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Security Name"
                variant="outlined"
                disabled
                fullWidth
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                error={!!errors.description}
                helperText={errors?.description?.message}
                sx={{ mb: 2 }}
              />
            )}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Pricing Currency</InputLabel>
            <Controller
              name="pricingCurrency"
              control={control}
              rules={{ required: "Currency is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Pricing Currency"
                  value={field.value || ""}
                  error={!!errors.pricingCurrency}
                >
                  {uniqueCurrencies.map((currency, index) => (
                    <MenuItem key={index} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.pricingCurrency && (
              <FormHelperText error>
                {errors.pricingCurrency.message}
              </FormHelperText>
            )}
          </FormControl>

          <Controller
            name="totalSharesOutstanding"
            control={control}
            rules={{
              required: "Total Shares Outstanding is required",
              pattern: { value: /^\d+$/, message: "Must be a valid number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Total Shares Outstanding"
                variant="outlined"
                fullWidth
                error={!!errors.totalSharesOutstanding}
                helperText={errors?.totalSharesOutstanding?.message}
                type="number"
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="openPrice"
            control={control}
            rules={{
              required: "Open Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Open Price"
                variant="outlined"
                fullWidth
                error={!!errors.openPrice}
                helperText={errors?.openPrice?.message}
                type="number"
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="closePrice"
            control={control}
            rules={{
              required: "Close Price is required",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Invalid price format",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Close Price"
                variant="outlined"
                fullWidth
                error={!!errors.closePrice}
                helperText={errors?.closePrice?.message}
                type="number"
                sx={{ mb: 2 }}
              />
            )}
          />
          <Controller
            name="dividendDeclaredDate"
            control={control}
            rules={{ required: "Dividend Declared Date is required" }}
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
                sx={{ mb: 2 }}
              />
            )}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>PF Credit Rating</InputLabel>
            <Controller
              name="pfCreditRating"
              control={control}
              rules={{ required: "PF Credit Rating is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="PF Credit Rating"
                  value={field.value || ""}
                  error={!!errors.pfCreditRating}
                >
                  {pfCreditRatingsData.PF_Credit_Rating?.map((rating) => (
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
