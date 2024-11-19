import React, { useEffect, useState } from "react";
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
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import pfCreditRatingsData from "../assets/utility-state-serve.json";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

const EquityEdit = ({ initialData, onClose, currencies = [], onUpdate }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    setValue,
    watch,
  } = useForm({ mode: "onChange" });

  const [initialValues, setInitialValues] = useState(null);

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

      const initialFormValues = {
        securityName: initialData["security Name"],
        description: initialData["security Description"],
        pricingCurrency: initialData["price Currency"],
        totalSharesOutstanding: initialData["shares Outstanding"],
        openPrice: initialData["open Price"],
        closePrice: initialData["close Price"],
        dividendDeclaredDate: format(
          new Date(initialData["declared Date"]),
          "yyyy-MM-dd"
        ),
        pfCreditRating: initialData["pf Credit Rating"],
      };

      setInitialValues(initialFormValues);
    }
  }, [initialData, setValue]);

  const formValues = watch();
  const selectedCurrency = formValues?.pricingCurrency || "USD";

  // Map of currency symbols
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    KRW: "₩",
    // Add more currency symbols as needed
  };

  const currencySymbol = currencySymbols[selectedCurrency] || "";

  const isFormUnchanged =
    initialValues &&
    JSON.stringify(formValues) === JSON.stringify(initialValues);

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

    const apiUrl = `https://localhost:7109/api/Equity/updateEquity${sid}`;

    try {
      const response = await axios.put(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 204) {
        alert("Equity updated successfully!");

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
        position: "relative", // Add position relative to position the close button
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1, // Ensure it's above other content
        }}
      >
        <CloseIcon />
      </IconButton>

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
              pattern: {
                value: /^\d{1,9}$/, // Ensure it's exactly 9 digits
                message: "Total Shares Outstanding must be exactly 9 digits",
              },
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
                InputProps={{
                  startAdornment: currencySymbol && (
                    <InputAdornment position="start">
                      {currencySymbol}
                    </InputAdornment>
                  ),
                }}
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
                value: /^\d{1,6}(\.\d{1,6})?$/, // Allow up to 10 digits before decimal and 2 decimal places
                message: "Out of range Value",
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
                InputProps={{
                  startAdornment: currencySymbol && (
                    <InputAdornment position="start">
                      {currencySymbol}
                    </InputAdornment>
                  ),
                }}
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
                value: /^\d{1,6}(\.\d{1,6})?$/, // Same pattern as openPrice
                message: "Out of range Value",
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
                InputProps={{
                  startAdornment: currencySymbol && (
                    <InputAdornment position="start">
                      {currencySymbol}
                    </InputAdornment>
                  ),
                }}
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
            disabled={isFormUnchanged || !isDirty || !isValid}
          >
            Update
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EquityEdit;