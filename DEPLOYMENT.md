# Deploy Natours Travel to AWS Lightsail

This site is a static Vite website, so the easiest deployment is to host the built files on an Ubuntu Lightsail instance with Nginx.

## 1) Create a Lightsail instance

1. Open the AWS Lightsail console.
2. Click Create instance.
3. Choose:
   - Platform: Ubuntu
   - Blueprint: Ubuntu 24.04 LTS
   - Plan: the smallest plan is usually enough for a static site
4. Give it a name such as `natours-web`.
5. Create the instance.

## 2) Attach a static IP

1. In Lightsail, go to Networking.
2. Create a static IP and attach it to your instance.
3. Copy the public IP address.

## 3) Open the needed ports

In the instance networking settings, make sure these ports are open:
- 22 (SSH)
- 80 (HTTP)
- 443 (HTTPS)

## 4) Connect to the server

Use SSH from your terminal:

```bash
ssh -i /path/to/your-key.pem ubuntu@YOUR_PUBLIC_IP
```

## 5) Install required packages

Run these commands on the server:

```bash
sudo apt update
sudo apt install -y nginx git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

## 6) Clone the website and build it

```bash
cd /var/www
sudo git clone https://github.com/YOUR_GITHUB_USERNAME/Natours-Travel.git natours
cd natours
sudo npm install
sudo npm run build
```

## 7) Serve the built files with Nginx

```bash
sudo rm -rf /var/www/html/*
sudo cp -r dist/* /var/www/html/
```

## 8) Create an Nginx config

Create a site config:

```bash
sudo tee /etc/nginx/sites-available/natours.conf > /dev/null <<'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
```

Enable it:

```bash
sudo ln -s /etc/nginx/sites-available/natours.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

## 9) Point your domain to Lightsail

### Option A: Use Lightsail DNS (recommended)

1. In Lightsail, go to Networking > Domains & DNS.
2. Click Create domain.
3. Enter your domain name, for example `natours-travel.com`.
4. Add these records:
   - A record: `@` -> your Lightsail instance public IP
   - CNAME record: `www` -> `@`
5. In Namecheap, change your domain nameservers to the ones shown by Lightsail.

### Option B: Keep Namecheap DNS

If you want to keep using Namecheap for DNS instead of Lightsail DNS:

1. In Namecheap, add an A record:
   - Host: `@`
   - Value: your Lightsail public IP
2. Add a CNAME record:
   - Host: `www`
   - Value: `@`

## 10) Test the site

After DNS changes propagate, open:

```bash
http://yourdomain.com
```

If you want, the next step can be to set up automatic deployment from GitHub so every push updates the site automatically.
