# cac-calculator

Calculate Customer Acquisition Cost (CAC) and related metrics for a given marketing and sales spend period.

## Use When

- A user asks "what is my customer acquisition cost"
- A user provides total marketing or sales spend and number of new customers
- A user wants to know LTV:CAC ratio or payback period
- A user is evaluating the efficiency of their sales and marketing spend

## Constraints

- Inputs must include total marketing spend + total sales costs and new customers acquired
- Payback period requires average revenue per customer
- Healthy LTV:CAC ratio is 3:1 or higher; below 1:1 means acquisition is unprofitable
- Tool returns estimates; user should verify with actual financials

## Output

Returns:
- CAC (Customer Acquisition Cost) in USD
- LTV:CAC ratio (if LTV provided)
- Payback period in months

## Endpoint

Available via Go-Orca free tool at `https://go-orca.tech/tools/cac-calculator`

## Formula

CAC = (Total Marketing Spend + Total Sales Costs) ÷ New Customers Acquired
