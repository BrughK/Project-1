// Fetch CoinGecko API and then insert into bulma table
fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=1h")
  .then(response => response.json())
  .then(data => {
    let output = "";
    data.forEach(coin => {
      output += `
        <tr>
          <td><img src = "${coin.image}" height='50' width='50'></img></td>
          <td>${coin.name}</td>
          <td>${coin.symbol}</td>
          <td>${coin.total_volume}</td>
          <td>${coin.price_change_percentage_24h}</td>
          <td>$${coin.current_price}</td>
        </tr>
      `;
    });
    document.getElementById("crypto-table-body").innerHTML = output;
  });

// Sort Price Table
let currentSort = 'ascending';

function sortTable() {
  let table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("crypto-table");
  switching = true;
  while (switching) {
      switching = false;
      rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[3];
      y = rows[i + 1].getElementsByTagName("TD")[3];
      if (currentSort === 'ascending') {
        if (Number(x.innerHTML.replace('$','')) > Number(y.innerHTML.replace('$',''))) {
          shouldSwitch = true;
          break;
        }
      } 
      else {
        if (Number(x.innerHTML.replace('$','')) < Number(y.innerHTML.replace('$',''))) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
  // Set the arrow direction
  let arrow = document.querySelector(".arrow");
  if (currentSort === 'ascending') {
      currentSort = 'descending';
      arrow.classList.remove("ascending");
  } 
  else {
      currentSort = 'ascending';
      arrow.classList.add("ascending");
  }
} 