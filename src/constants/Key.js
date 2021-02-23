export const STRIPE_PUBLISHABLE_KEY = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
   ? "pk_test_51HcyfVCZtaFPaPpxrzpHRy5DaZE0edExJHjXJwyhfxsmy1uGkJy37YiPyWBmy1xsIGewvU9UTZdKLjQgTkEv0uZI00buu0YlAo"
   // : "pk_test_51HcyfVCZtaFPaPpxrzpHRy5DaZE0edExJHjXJwyhfxsmy1uGkJy37YiPyWBmy1xsIGewvU9UTZdKLjQgTkEv0uZI00buu0YlAo";
   : "pk_live_51HcyfVCZtaFPaPpxjCdszp1oYGxFu2WET28eoHEjtJoPIASaOfbp4bRarcdWkWzWzz8khcJDPVbdB4UeJB2I7e3V00vO9Tx07l";