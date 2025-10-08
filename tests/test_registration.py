from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import os
import time

# Configure headless Chrome options
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)

try:
    # Open the site
    driver.get("http://localhost:8000")
    time.sleep(2)  # Allow time for the page to load

    # Fill the form
    driver.find_element(By.NAME, "name").send_keys("Alice Example")
    driver.find_element(By.NAME, "phone").send_keys("9876543210")
    driver.find_element(By.NAME, "email").send_keys("alice@example.com")
    driver.find_element(By.NAME, "college").send_keys("Computer Science")

    # Upload file
    screenshot_path = os.path.abspath("tests/dummy_screenshot.png")
    driver.find_element(By.ID, "screenshot").send_keys(screenshot_path)

    # Submit the form
    driver.find_element(By.ID, "submitBtn").click()
    time.sleep(2)  # Let the form process

    # Check for the success message
    success_message = driver.find_element(By.ID, "successMessage")
    assert success_message.is_displayed()
    print("✅ Test passed: Submission successful.")

except Exception as e:
    print("❌ Test failed:", e)

finally:
    driver.quit()
