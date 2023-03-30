async function getOpenAIResponse(prompt) {
  const apiKey = "";

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer ${apiKey}",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 300,
      temperature: 0,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.choices[0].text);
      answer = data.choices[0].text;
      const messageElement = document.createElement("p");
      messageElement.innerText = "機器人：" + answer;
      document.getElementById("messageContainer").appendChild(messageElement);
    })
    .catch((error) => console.error(error));
}

function sendMessage() {
  // 獲取使用者輸入的文字
  const message = document.getElementById("messageInput").value;

  // 建立一個新的 <p> 元素
  const messageElement = document.createElement("p");

  // 將使用者輸入的文字設置為 <p> 元素的文本內容
  messageElement.innerText = "我：" + message;

  // 將 <p> 元素添加到 HTML 中，顯示在畫面上
  document.getElementById("messageContainer").appendChild(messageElement);

  // 清空輸入框
  document.getElementById("messageInput").value = "";
  replyToUser(message);
}

// 儲存使用者是否開始點餐的狀態
let isOrdering = false;
// 儲存使用者所選擇的餐點類型
let cuisineType = "";
// 儲存使用者所設置的熱量上限
let calorieLimit = 0;

// 定義一個函數來回覆使用者的輸入
async function replyToUser(input) {
  // 判斷是否開始點餐
  if (input === "開始點餐") {
    isOrdering = true;
    const messageElement = document.createElement("p");
    messageElement.innerText = "機器人：想吃什麼類型的餐點？";
    document.getElementById("messageContainer").appendChild(messageElement);
  }

  // 如果未開始點餐，則提示使用者要先輸入「開始點餐」
  if (!isOrdering) {
    const messageElement = document.createElement("p");
    messageElement.innerText = "機器人：請輸入「開始點餐」來進行點餐建議哦";
    document.getElementById("messageContainer").appendChild(messageElement);
  }

  // 判斷使用者所選擇的餐點類型
  if (cuisineType == "" && isOrdering == true) {
    if (input === "中式餐點" || input === "西式餐點") {
      cuisineType = input;
      const messageElement = document.createElement("p");
      messageElement.innerText = "機器人：所需的熱量上限？";
      document.getElementById("messageContainer").appendChild(messageElement);
    } else {
      const messageElement = document.createElement("p");
      messageElement.innerText = "機器人：請輸入「中式餐點」或「西式餐點」";
      document.getElementById("messageContainer").appendChild(messageElement);
    }
  }
  // 如果已經選擇了餐點類型，則獲取使用者設置的熱量上限
  if (calorieLimit == "0" && cuisineType != "" && isOrdering == true) {
    calorieLimit = input;
  } else if (calorieLimit != "0" && cuisineType != "" && isOrdering == true) {
    myPrompt = "推薦我三樣熱量低於" + input + "的" + cuisineType;
    // await getOpenAIResponse(myPrompt).then(response);
    getOpenAIResponse(myPrompt);
  }

  input = "";
}
