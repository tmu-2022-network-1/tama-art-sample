export async function getData(sheetName = '', id = 0) {
  const endpoint =
    "https://script.google.com/macros/s/AKfycbxhZ4ww0rLhp6A72xu4HznL5g-cA6BqosnggI2xlzzqrQKqVbq2HTLZO8MpdnaIkZLG_Q/exec";
  try {
    const response = await fetch(`${endpoint}?sheet=${sheetName}&id=${id > 0 ? id : ''}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error);
  }
}
