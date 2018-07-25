//Dynamic content displayed on the view 
// 1. variables defined in the app.js file
// 2. views implemented with variables
// 3. app.js file defines how to use the variables
var fortunes = ["Conquer your fears or they will conquer you.",
                "Rivers need springs.",
                "Do not fear what you don't know.",
                "You will have a pleasant surprise.",
                "Whenever possible, keep it simple.",
];

/*The important thing to note here is the use of the global variable exports. If you want
something to be visible outside of the module, you have to add it to exports. In this
example, the function getFortune will be available from outside this module, but our
array fortuneCookies will be completely hidden. This is a good thing: encapsulation
allows for less error-prone and fragile code.*/

// This is the same concept as private and public in C#
exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortunes.length);
    return fortunes[idx];
    };

exports.getExchangeRateData = function() {
    return {
        currencies: [
            {
                srcCurrency: 'USD',
                desCurrency: 'CNY',
                exchangeRate: '6.78'
            },
            {
                srcCurrency: 'EUR',
                desCurrency: 'CNY',
                exchangeRate: '7.94'
            },
            {
                srcCurrency: 'GBP',
                desCurrency: 'CNY',
                exchangeRate: '8.89'
            },
        ],
    };
}