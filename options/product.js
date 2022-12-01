app.component("product",{
    template:/*vue-html*/`
        <section class="product">
            <div class="product__thumbnails">
                <div 
                    v-for="(image,index) in product.images"
                    :key="image.thumbnail"
                    class="thumb"
                    :class="{active: activeImage==index}"
                    :style="{backgroundImage: 'url(' +product.images[index].thumbnail+ ')'}"
                    @click="activeImage = index"
                ></div>
                
            </div>
            <div class="product__image">
                <img :src="product.images[activeImage].image" alt="product.name">
            </div>
        </section>
        <section class="description">
            <h4>{{ product.name.toUpperCase() }} {{ product.stock == 0 ? "😣" : "😀" }}</h4>

            <badge :product="product"></badge>
            
            <p class="description__status" v-if="product.stock == 3">Quedan pocas unidades</p>
            <p v-show="product.offer">hola chicassss</p>
            <p class="description__status" v-if="product.stock>=2"> Quedan pocos unidades, apurate!</p>
            <p class="description__status" v-else-if="product.stock==1"> Queda una unidad</p>
            <p class="description__status" v-else-if="product.stock==0"> No quedan unidades</p>
            <p class="description__price"></p>
            <p class="descripton__content"></p>
            <div class="discount">
                <span>Codigo de Descuento:</span>
                <input type="text" placeholder="Ingrese un codigo!" @keyup.enter="applyDiscount($event)"/>
            </div>
            <button :disabled="product.stock==0" @click="addToCart()">Agregar al carrito</button>
        </section>
    `,
    props:["product"],
    data(){
        return { 
            activeImage: 0,
            discountCodes: ["el_programador","morado","adaug"]
        };
    },
    methods: {
        applyDiscount(event){
            var discountCodeIndex = this.discountCodes.indexOf(event.target.value);
            if (discountCodeIndex>=0){
                this.product.price/=2;
                this.discountCodes.splice(discountCodeIndex,1)
            }
        },
        addToCart(){
            const productIndex = this.cart.indexOf(prod => prod.name == this.product.name);
            if(productIndex<0){
                this.cart.push(this.product);
            }else{
                this.cart[productIndex].quantity+=1;
            }
            this.product.stock-=1;
        }
    }
});