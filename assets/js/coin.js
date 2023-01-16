fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage='1h'")
  .then(response => response.json())
  .then(data => {
    let output = "";
    data.forEach(coin => {
      output += `
        <tr>
          <td><img src = "${coin.image}" height='50' width='50'></img></td>
          <td>${coin.name}</td>
          <td>${coin.symbol}</td>
          <td>$${coin.current_price}</td>
        </tr>
      `;
    });
    document.getElementById("crypto-table-body").innerHTML = output;
  });