<template>
  <div>
    <!-- Форма ввода штрих кода -->
    <form class="form-wrap" @submit.prevent="getInfoProductByCode">
      <input 
        type="number" 
        placeholder="Введите сюда штрих код" 
        v-model.lazy="productCode"
      ><br>
      <button type="submit">Получить информацию о товаре</button>
    </form>

    <!-- Тут выводим сообщения об ошибке -->
    <small v-show="error" style="color: red;">{{error}}</small>

    <!-- Сюда отображается информация полученная с бэкенда -->
    <div class="info-wrap" v-if="productName">
      
      <li>Название: <strong>{{productName}}</strong></li>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Terminal',
  data: () => ({
    productCode: Number, // Это штрих код
    error: '', // Ошибка в строковом формате
    productName: '' // Название продукта полученого по штрих коду
  }),
  methods: {
    // Здесь мы с бэкенда получаем информацию о товаре по штрих коду
    async getInfoProductByCode() {
      
      // Тут банальная валидация, чтобы пользователь ввел именно 13 цифр
      if (this.productCode.length === 13) {
        // Очищаем строку ошибки
        this.error = ''

        // Тут связываемся с бэкэндом на 3000 локальном порте
        const req = new XMLHttpRequest()
        req.open("POST", "http://localhost:3000", true)
        req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

        await req.send(this.productCode)

        req.onreadystatechange = () => {

          if (req.readyState == 4) {
            // Тут если сервер ответил удачно и вернул какие то данные, то выполняем этот блок кода
            if (req.status == 200) {
              this.error = ''       
              
              // Деструктурируем приходящие данные, а именно вытаскиваем data (именно там хранится нужная нам инфа)
              let {data} = JSON.parse(req.responseText)

              // А здесь просто раскидываем по переменным нужные нам данные (data[0] - потому что изначально это все типо массив с одним элементом)
              this.productName = data[0].product_name


            } else {
              this.error = 'Ошибка: сервер не отвечает'
            }
          }
        }     
      } else {
        // Если пользователь ввел меньше или больше цифр, то выведем ему ошибку
        this.error = 'Ошибка: штрих код должен содержать 13 цифр'
      }
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.form-wrap {
  max-width: 300px;
  height: 80px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  
}

.form-wrap input {
  width: 100%;
  height: 30px;
  padding: 0;
  margin: 0;
  font-size: 20px;
}


.form-wrap button {
  cursor: pointer;
  width: 100%;
}

.info-wrap {
  max-width: 300px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 2px dotted black;
}

</style>
