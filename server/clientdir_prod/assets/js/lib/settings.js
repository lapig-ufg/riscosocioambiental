console.log('--- app.js')

var minify = false;
var app,base

if(minify){
  base = 'assets/js/min'
  app = '../min'
}else{
  base = 'assets/js/lib'
  app = '../app'
}

requirejs.config({
    baseUrl: base,
    paths: {
      app: app
    },
    shim: {
      'jquery-cross-origin'   :{ deps:['jquery']},
      'jquery-easing'         :{ deps:['jquery']},
      'jquery-scrollTo'       :{ deps:['jquery']},
      'jquery-ui'             :{ deps:['jquery']},
      'defiant'               :{ deps:['jquery']},
      'leaflet'               :{ deps:['jquery']},
      'leaflet.googlemutant'  :{ deps:['jquery','leaflet']},
      'L.UTFGridWMS'          :{ deps:['jquery','leaflet']},
      'corslite'              :{ deps:['jquery','leaflet']},
      //app
      'app/icons'             :{ deps:['jquery','leaflet','defiant']},
      'app/main'              :{ deps:['jquery','leaflet','defiant','app/icons']},
      'app/lang'              :{ deps:['jquery','leaflet','defiant','app/icons','app/main' ]},
      'app/navigation'        :{ deps:['jquery','leaflet','defiant','app/icons','app/main','app/lang' ]}
   }
});

// Start the main app logic.

require([
  'jquery',
  'jquery-cross-origin',
  'jquery-easing',
  'jquery-scrollTo',
  'jquery-ui',
  'jquery-ui',
  'defiant', // defiantjs.com
  'leaflet',
  'leaflet.googlemutant',
  'L.UTFGridWMS',
  'corslite',
  //app
  'app/icons',
  'app/main',
  'app/lang',
  'app/navigation'
]);
