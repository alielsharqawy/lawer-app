module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", 
        secondary: "#1D4ED8", 
        text: "#1E293B", 
      },
      fontFamily: {
        sans: ["Cairo", "sans-serif"], // هنا أضفنا الخط المخصص
      },
    },
  },
  plugins: [],
};
