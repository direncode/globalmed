# GlobeMed at UNC-Chapel Hill Website

A modern, professional website for GlobeMed at UNC-Chapel Hill, featuring a donation system with Stripe, PayPal, and test payment integration.

## Features

- **Modern Design**: Pfizer-inspired professional blue theme
- **Responsive**: Mobile-first design that works on all devices
- **Donation System**: Multiple payment options
  - Stripe (credit/debit cards)
  - PayPal
  - Test mode for development
- **Pages**:
  - Home / About
  - Our Partner (ASSADE)
  - Get Involved
  - Donate
  - Contact

## Tech Stack

- [Next.js 16](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Stripe](https://stripe.com/) - Payment processing
- [PayPal](https://developer.paypal.com/) - Alternative payment

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (for payments)
- PayPal Developer account (for PayPal payments)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd globalmed
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` with your API keys:
```env
# Stripe - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key

# PayPal - Get from https://developer.paypal.com/dashboard/applications
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/globalmed)

### Manual Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel URL, e.g., `https://globemed.vercel.app`)
5. Deploy!

## Payment Integration

### Stripe Setup

1. Create a [Stripe account](https://dashboard.stripe.com/register)
2. Get your API keys from the [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. For testing, use the test mode keys (prefixed with `sk_test_` and `pk_test_`)
4. For production, switch to live mode keys

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

### PayPal Setup

1. Create a [PayPal Developer account](https://developer.paypal.com/)
2. Create an app in the [Developer Dashboard](https://developer.paypal.com/dashboard/applications)
3. Get your Client ID
4. For testing, use Sandbox mode
5. For production, switch to Live mode

### Test Payment Mode

The built-in test payment mode allows you to simulate donations without any real payment processing:

- Use card number `4242 4242 4242 4242` for success
- Use card number `4000 0000 0000 0002` for decline
- Any expiry date and CVC will work

## Project Structure

```
globalmed/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stripe/          # Stripe checkout API
│   │   │   └── test-payment/    # Test payment API
│   │   ├── contact/
│   │   ├── donate/
│   │   │   ├── success/
│   │   │   └── cancel/
│   │   ├── get-involved/
│   │   ├── our-partner/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Header.tsx
│       └── Footer.tsx
├── public/
├── .env.example
├── .env.local
├── next.config.ts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret key | Yes (for Stripe) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes (for Stripe) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client ID | Yes (for PayPal) |
| `NEXT_PUBLIC_SITE_URL` | Your site URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for GlobeMed at UNC-Chapel Hill.

## Support

For questions, contact [globemed@unc.edu](mailto:globemed@unc.edu)
