def cToFConverter():
    
    while True:
        cTemp = (input("please enter C degree: "))
        if cTemp:
            cTemp = float(cTemp)
            fTemp = (cTemp * 9 / 5) + 32
            print(f"{cTemp}C is converter to {round(fTemp, 1)}F")
            break
        else:
            print(f"cTemp input is empty")
            continue

def main():
    cToFConverter()
    
if __name__ == "__main__":
    main()