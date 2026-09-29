---
inclusion: always
---

# Deployment — Sanctify FTP (demo3)

When asked to "make the website live" / "deploy" for this project, publish the built
site to the Sanctify hosting account over **explicit FTPS**.

## Connection details

- **Host:** `ftp.sanctify.co`
- **Port:** `21`
- **Protocol:** Explicit FTPS (FTP over TLS) — always use TLS, never plain FTP
- **Username:** `demo3@demo3.sanctify.co`
- **Password:** provided by the user at deploy time (NOT stored in the repo)
- **Remote web root:** confirm with the user before first deploy (commonly `/` or
  `/public_html`). Upload site files into the web root.

## Deploy procedure

1. Build/prepare the site files locally in this repo.
2. Confirm the remote target directory (web root) with the user if not already known.
3. Upload over explicit FTPS. `curl` is available in the sandbox and supports this.

Single file example (explicit FTPS via `--ssl-reqd`):

```bash
curl --ssl-reqd -T local/index.html \
  "ftp://ftp.sanctify.co/index.html" \
  --user "demo3@demo3.sanctify.co:$FTP_PASSWORD"
```

Recursive upload of a folder: iterate files and `curl -T` each one, or install
`lftp` (`mirror -R local remote`) if available.

## Security notes

- The FTP password is a live credential. Do **not** commit it to the repo or paste
  it into files. Pass it via an environment variable (`$FTP_PASSWORD`) at deploy time.
- Prefer explicit FTPS (`--ssl-reqd`) so credentials and data are encrypted in transit.
