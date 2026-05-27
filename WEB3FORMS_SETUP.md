# Web3Forms setup (form → your email)

Forms on this site send submissions to your inbox using [Web3Forms](https://web3forms.com) (free tier).

## Steps

1. Open **https://web3forms.com/** and sign up (free).
2. Click **Create Access Key** (or go to dashboard).
3. Enter the **email address** where you want to receive submissions.
4. Copy your **Access Key**.
5. Open the project file `.env` and set:

```env
VITE_WEB3FORMS_ACCESS_KEY=paste_your_key_here
```

6. Restart the dev server:

```bash
npm run dev
```

7. Test: click **REGISTER NOW** or **BECOME AN EXHIBITOR**, submit the form, then check your inbox (and spam folder).

## Production (live website)

When you deploy (Vercel, Netlify, etc.), add the same variable in hosting settings:

- Name: `VITE_WEB3FORMS_ACCESS_KEY`
- Value: your Web3Forms access key

Redeploy after adding it.

## What gets emailed

- **Visitor form:** name, email, phone, city, interest type, message  
- **Exhibitor form:** company, contact, email, phone, company type, website, projects, booth preference, message  

Free plan limit is on Web3Forms (see their pricing page). No Gmail SMTP or server required.
