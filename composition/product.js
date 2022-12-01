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
                <h4>{{product.name}} {{product.stock==0 ? "👀" : "😁"}}</h4>
                <badge :product="product"></badge>
                <p>{{product.price}} $</p>

                <br>
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
            </section>`,
            props:["product"],
            setup(props){
                const productState = reactive ({
                    activeImage: 0,
                });
                const discountCodes=ref(["bebita","adaug"]);
                function applyDiscount(event){
                    var discountCodeIndex = discountCodes.value.indexOf(event.target.value);
                    if (discountCodeIndex>=0){
                        props.product.price/=2;
                        discountCodes.value.splice(discountCodeIndex,1)
                    }
                }
                function addToCart(){
                    const productIndex = cartState.cart.indexOf(prod => prod.name == props.product.name);
                    if(productIndex<0){
                        cartState.cart.push(props.product);
                    }else{
                        cartState.cart[productIndex].quantity+=1;
                    }
                    props.product.stock-=1;
                }
                return {
                    ...toRefs(productState),
                    addToCart,
                    applyDiscount,
                    discountCodes,
                    productState
                };
            }
})