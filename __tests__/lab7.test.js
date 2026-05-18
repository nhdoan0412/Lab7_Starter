describe('Basic user flow for Website', () => {
  // First, visit the lab 7 website
  beforeAll(async () => {
    await page.goto('https://cse110-sp25.github.io/CSE110-Shop/');

    // Make sure the cart starts empty every time we run this test file
    await page.evaluate(() => {
      localStorage.setItem('cart', '[]');
    });

    await page.reload();
  });

  // Each it() call is a separate test
  // Here, we check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');

    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });

    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');

    let allArePopulated = true;

    const prodItemsData = await page.$$eval('product-item', (prodItems) => {
      return prodItems.map((item) => {
        return item.data;
      });
    });

    for (let i = 0; i < prodItemsData.length; i++) {
      console.log(`Checking product item ${i + 1}/${prodItemsData.length}`);

      const product = prodItemsData[i];

      if (product.title.length === 0) {
        allArePopulated = false;
      }

      if (product.price.length === 0) {
        allArePopulated = false;
      }

      if (product.image.length === 0) {
        allArePopulated = false;
      }
    }

    expect(allArePopulated).toBe(true);
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');

    const buttonText = await page.$eval('product-item', (productItem) => {
      const button = productItem.shadowRoot.querySelector('button');
      button.click();
      return button.innerText;
    });

    expect(buttonText).toBe('Remove from Cart');
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.$$eval('product-item', (productItems) => {
      productItems.forEach((productItem) => {
        const button = productItem.shadowRoot.querySelector('button');

        if (button.innerText === 'Add to Cart') {
          button.click();
        }
      });
    });

    await page.waitForFunction(() => {
      return document.querySelector('#cart-count').innerText === '20';
    });

    const cartCount = await page.$eval('#cart-count', (cart) => {
      return cart.innerText;
    });

    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    const allButtonsSayRemove = await page.$$eval('product-item', (productItems) => {
      return productItems.every((productItem) => {
        const button = productItem.shadowRoot.querySelector('button');
        return button.innerText === 'Remove from Cart';
      });
    });

    expect(allButtonsSayRemove).toBe(true);

    const cartCount = await page.$eval('#cart-count', (cart) => {
      return cart.innerText;
    });

    expect(cartCount).toBe('20');
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });

    expect(cart).toBe('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]');
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');

    await page.$$eval('product-item', (productItems) => {
      productItems.forEach((productItem) => {
        const button = productItem.shadowRoot.querySelector('button');

        if (button.innerText === 'Remove from Cart') {
          button.click();
        }
      });
    });

    await page.waitForFunction(() => {
      return document.querySelector('#cart-count').innerText === '0';
    });

    const cartCount = await page.$eval('#cart-count', (cart) => {
      return cart.innerText;
    });

    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');

    await page.reload();

    const allButtonsSayAdd = await page.$$eval('product-item', (productItems) => {
      return productItems.every((productItem) => {
        const button = productItem.shadowRoot.querySelector('button');
        return button.innerText === 'Add to Cart';
      });
    });

    expect(allButtonsSayAdd).toBe(true);

    const cartCount = await page.$eval('#cart-count', (cart) => {
      return cart.innerText;
    });

    expect(cartCount).toBe('0');
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');

    const cart = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });

    expect(cart).toBe('[]');
  });
});