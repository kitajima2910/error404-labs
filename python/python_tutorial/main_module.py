from pxh2910 import emailProcess, printMsg

def main():
    emails = ["abc@dev.com", "xyz@asd.com", "pxh2910@dev.com"]
    for email in emails:
        email_username, email_domain = emailProcess(email)
        printMsg(email_username, email_domain)

if __name__ == "__main__":
    main()