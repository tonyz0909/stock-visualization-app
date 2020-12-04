<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<h1 align="center">
  Stock Visualization App
</h1>

![Screenshot of the stock dashboard](https://github.com/tonyz0909/stock-visualization-app/blob/master/screenshot.png?raw=true)

This project is a stock visualization dashboard created using Gatsby, a React framework used for static site generation.

It contains a quick "overview" card on the left containing at-a-glance key facts for the current stock, and contains a stock chart. The chart can either display weekly prices, or a seasonal chart detailing average month-to-month changes for the stock calculated from the past 5 years. The time range of the stock chart is also adjustable, and the weekly chart can optionally display lines for data points like analyst target price and SMA. Below the chart/overview is an analysis card with additional information like a breakdown of the stock ownership and description of the company.

This project was made using:
1. Gatsby (in order to speed up static rendering of the site since it has no server-side component)
2. AlphaVantage API for stock data
3. Material-UI
4. Recharts.js for the stock chart (chosen for the wide range of functionality it had, such as the brush chart below the stock line graph)
5. chartjs for the analysis charts (chosen for its sleek UI)

## 🚀 Quick start

1.  **Download and clone the project**

1.  **Run the project locally**

    Navigate into the project directory and start it up.

    ```shell
    gatsby develop
    ```

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/gatsbyjs/gatsby-starter-default)

<!-- AUTO-GENERATED-CONTENT:END -->
