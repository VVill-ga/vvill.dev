---
title: ":email: Free Custom Email"
image: /img/freeemail.webp
desc: 
    - >-
        Did you know that you could have custom email addresses for your domain
        name using free a Google account? It's not without its tradeoffs and 
        limitations, but it is completely free!

    - >-
        I learned about this from a Cloudflare Community post in 2022 (linked
        below), and in my post I'll go more in-depth with instruction and try to
        provide more detail on what's actually going on.

tags:
    - Webdev
links: 
    - link: https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing
      text: Original Post
date: 2023-12-30
---

Before we get started, I'd like to acknowledge my source. I learned about this 
process from a Cloudflare Community post in 2022, which can be found 
[here](https://community.cloudflare.com/t/solved-how-to-use-gmail-smtp-to-send-from-an-email-address-which-uses-cloudflare-email-routing).
This post is for my own archive, to spread the word about this technique, and to
provide a more complete step-by-step set of instructions. Before you start, I
recommend reading the [tradeoffs section](#tradeoffs).

## What You'll Need:

- **A domain name** *(My favorite registrar is [Cloudflare](https://cloudflare.com)
because they are the cheapest long-term option and make great products)*
    - I have not tried this process on free subdomain services like 
    [x.is-a.dev](https://is-a.dev). They seem to support DNS records as written 
    [here](https://www.is-a.dev/docs/hosting/), so if you try this out, let me
    know how it goes! [contact@vvill.dev](mailto:contact@vvill.dev)
- **A personal gmail account** *(Or make a new one, it doesn't really matter)*
- **A device** to use Google's two factor authentication
- **An internet connection** *(probably)*


## The Guide

### Step 1: Creating Accounts

If you don't already use a gmail account for personal mail, or just want to use 
a separate inbox, [make a new one](https://accounts.google.com/lifecycle/steps/signup/name?flowEntry=SignUp).
This process may be possible with alternative email providers, but I am not
familiar with them. I believe it is doable with a Microsoft account (Outlook,
Hotmail, Live, etc) as described [here](https://support.microsoft.com/en-gb/office/send-email-from-a-different-address-in-outlook-com-ccba89cb-141c-4a36-8c56-6d16a8556d2e).
\
\
You will also need a DNS server that allows email forwarding and editing TXT DNS
records. I recommend getting a free account on [Cloudflare](https://dash.cloudflare.com/sign-up?pt=f).
Set your domain name's name servers to the ones you got from your account (if 
you bought your domain on Cloudflare, they are already set).

### Step 2: Set Up Email Forwarding

The next step is to set up your custom email address to forward to your gmail 
address. This is a fairly simple process which will likely include receiving a 
verification email to ensure that you control the address you're forwarding to.
On Cloudflare, go to the Email Routing section, add your gmail Destination
Address, follow the link in the verification email, then go back and create an 
address (under Routing Rules) which will be your custom address.
\
\
For multiple addresses, this step is repeatable.

### Step 3: Update DNS Records

Now take a look at your DNS records. There should be one or more MX records set
up forwarding mail to the domain of your DNS server. If there are more than one,
they are there for backup. We're going to have to add a TXT records to define
some email security rules that will allow your mail sent from gmail to pass
through as your custom email to the recipient. This will be a *root* txt record
with default TTL and content of:

```
v=spf1 a mx include:_spf.google.com include:_spf.mx.cloudflare.net  ~all
```

### Step 4: Set up Send Mail As

This is the trickier part, described in the Cloudflare Community post I referred
to earlier. First, you'll want to [enable 2 Factor Authentication](https://myaccount.google.com/signinoptions/two-step-verification)
for your gmail account if you haven't already. Next, [create an app password](https://security.google.com/settings/security/apppasswords)
for your gmail account which will be used during the setup of the Send Mail As
address. Copy the password and keep the tab open just in case. Once you click
out of the password modal or close it, there is no way to get it back. If you do
this by accident, it is okay to delete it and make a new one.
\
\
Now go to your [gmail inbox](https://mail.google.com) and navigate through your
Settings to the Accounts section, and under Send Mail As, click on "Add Another
Email Address". Fill in the first form with your custom email address and the
name you want to be associated with the address, **untick 'Treat as an alias'** 
and click Next. Fill out the next form with the following values:
\
\
**SMTP Server:** `smtp.gmail.com 298` **Port:** `587`\
**Username:** *Current Gmail Address* (incl. @gmail.com)\
**Password:** *Paste App Password*\
**Leave TLS enabled**
\
\
Click Add Account, and you should get sent a verification email from Google this
time. Follow the instructions there, and then you should be able to send mail 
from your new address. Read Step 6 if you'd like to try that now.
\
\
For multiple addresses, you should make a new app password and repeat this step
for each one.

### Step 5: Create Google account

This step is optional, but gives you the opportunity to **add a profile picture**
and collaborate on the Google suite (Google Drive, Photos, Docs, etc). Simply
[make a new account](https://accounts.google.com/lifecycle/steps/signup/name?flowEntry=SignUp)
using your custom email address when prompted on the 3rd page. You'll have to
select "Use your existing email" on that page. The Gmail inbox will not work,
but everything else should!

### Step 6: Test it!

That's all! Just a note on testing, if you send an email from your new address
to your old one, Google will notice that the sender and recipient are the same
and it will not show up in your inbox. For that reason, you'll need to use a
different email to send a test email to. If you don't have an extra one laying
around, send an email to a friend or something.
\
\
When you hit compose from the gmail app or website, you should now see a From:
line above To:. Click on it and click the dropdown, and you should be able to
send from your new custom address. Write the email as usual and hit send. It
should come through the other side as it was written by your custom address!


## Other Notes

If you have anything else to add, or run into any special problems, make a pull
request or write an issue on my website's [github repo](https://github.com/VVill-ga/vvill.dev).
This file is located: `/content/blog/freeemail.md`.

### K-9 Mail

I use [K-9 Mail](https://k9mail.app) for email on my phone, and to set up the 
custom address on the app, go to your account settings for the gmail address
it's linked to, tap "Sending mail" and then "Manage identities". Tap the three
dots in the top right corner, and hit "New identity". Now put in your custom
address under "Email address", fill in any other notes you'd like, and hit save.


## Tradeoffs

### Non-Anonymity

First of all, it is important to note that it will still be possible for 
recipients to find the original sending email address. An email from your new
address will append "via gmail.com" to the sender name in the recipient's inbox.
If they look at the source email with all the metadata attached, they'll see
that it was originally sent from your original gmail address. Apart from this
however, there is no difference to a full mail inbox and most people won't know.

### Long-term Reliability

This process is only possible by the grace of Google. It is possible that they
remove the Send Mail As feature at any time, in which case you will still be
able to receive mail from your custom address, but not send from it. 

### Management

There are no management features, and this process is not very scalable, so I
would not recommend using it for business operations or where you need more than
a couple email addresses.
