from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import os

# Setup Chrome in headless mode
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)

try:
    # Open the site
    driver.get("http://localhost:8000")
    time.sleep(2)

    # Fill in the form fields
    driver.find_element(By.NAME, "name").send_keys("Alice Example")
    driver.find_element(By.NAME, "phone").send_keys("9876543210")
    driver.find_element(By.NAME, "email").send_keys("alice@example.com")
    driver.find_element(By.NAME, "college").send_keys("Computer Science")

    # Upload a dummy file
    test_file_path = os.path.abspath("tests/dummy_screenshot.png")
    driver.find_element(By.NAME, "screenshot").send_keys(test_file_path)

    # Submit the form
    driver.find_element(By.ID, "submit-btn").click()
    time.sleep(2)

    # Check for confirmation message or change in page
    assert "Thank you" in driver.page_source or "submitted" in driver.page_source.lower()
    print("✅ Test passed: Registration form submitted successfully.")

except Exception as e:
    print("❌ Test failed:", str(e))

finally:
    driver.quit()
