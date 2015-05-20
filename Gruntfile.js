// Generated on 2015-02-03 using
// generator-webapp 0.5.1
'use strict';

// # Globbing

module.exports = function (grunt) {

  // Configurable paths
  var config = {
    app: 'app',
    test: 'test',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    clean: {
      build: {
        src: ['<%= config.test %>/', '<%= config.dist %>/']
      }
    },

    // 脚本验证
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      //foo: { src: ['Gruntfile.js', '<%= config.app %>/js/{,*/}*.js'] },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/js/{,*/}*.js'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/sass/',
          src: ['*.{scss,sass}'],
          dest: '<%= config.app %>/css/',
          ext: '.css'
          }
          /*
          files: {                       // 文件列表
          'main.css': 'main.scss',       // '目标文件': '源文件'
          'widgets.css': 'widgets.scss'
          }
          */
        ]
      }
    },

     // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/css/',
          src: '{,*/}*.css',
          dest: '<%= config.test %>/css/'
        }]
      }
    },

    // 文件合并 样式文件和脚本文件
    concat: {
      js: {
        src: ['<%= config.app%>/js/carouselFigure.js', '<%= config.app%>/js/imgList.js', '<%= config.app%>/js/card.js', 
              '<%= config.app%>/js/accordionBox.js', '<%= config.app%>/js/table.js', '<%= config.app%>/js/tabBox.js',
              '<%= config.app%>/js/groupnavigation.js', '<%= config.app%>/js/columns.js', '<%= config.app%>/js/gallery.js',
              '<%= config.app%>/js/brickWall.js', '<%= config.app%>/js/columns.js', '<%= config.app%>/js/ring3D.js',
              '<%= config.app%>/js/feedbackGroup.js', '<%= config.app%>/js/waterfalls.js'],
        dest: '<%= config.test%>/index.js'
      },
      js2: {
        src: ['<%= config.app%>/js/lib/zeptojs/zepto.js', '<%= config.app%>/js/lib/tppl.js'],
        dest: '<%= config.test%>/zepto.js'
      },
      /*
      js4: {
        '<%= config.test%>/zepto.js' : ['<%= config.app%>/js/lib/zeptojs/zepto.js', '<%= config.app%>/js/lib/underscorejs/underscore.js'],
        '<%= config.test%>/index2.js' : ['<%= config.app%>/js/accordionBox.js', '<%= config.app%>/js/card.js']
      },
      */
      css: {
        src:[
          '<%= config.app%>/css/experiment-styles.css', 
          '<%= config.app%>/css/experiment-layout.css', 
          '<%= config.app%>/css/experiment-wall.css', 
          '<%= config.app%>/css/experiment-tab.css',
          '<%= config.app%>/css/experiment-imgList.css', 
          '<%= config.app%>/css/experiment-accordion.css', 
          '<%= config.app%>/css/experiment-card.css', 
          '<%= config.app%>/css/experiment-table.css',
          '<%= config.app%>/css/experiment-navgroup.css', 
          '<%= config.app%>/css/experiment-column.css', 
          '<%= config.app%>/css/experiment-brickwall.css',
          '<%= config.app%>/css/experiment-ring.css',
          '<%= config.app%>/css/experiment-feedback.css',
          '<%= config.app%>/css/experiment-waterfalls.css'],
        dest: '<%= config.test%>/experiment.css'
      }
    },
    
    //文件压缩
    cssmin: { 
      minify: { 
        expand: true, 
        cwd: '<%= config.test %>/',
        src: ['*.css', '!*.min.css'], 
        dest: '<%= config.test %>/css/', 
        ext: '.min.css' 
      }, 
      combine: { 
        files: { '': [] } 
      }
    },

    uglify: {
      options: {
        banner: '/*! 信息发布门户 <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMapRoot: '<%= config.test %>/',
        sourceMap: '*.min.js.map'
        //sourceMapUrl: 
      },
      target: {
        expand: true,
        cwd: '<%= config.test %>/',
        src: '*.js',
        dest: '<%= config.test %>/js/',
        ext: '.min.js'
      }
    },

    uglify1: {
      options: {
        banner: '/*! 中教启星M版 <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMapRoot: '<%= config.test %>/',
        sourceMap: '*.min.js.map'
        //sourceMapUrl: 
      },
      target: {
        expand: true,
        cwd: '<%= config.test %>/',
        src: '*.js',
        dest: '<%= config.test %>/js/',
        ext: '.min.js'
      }
    },


    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.test %>/',
          dest: '<%= config.dist %>/',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.*',
            '{,*/}*.html',
            'css{,*/}*.*',
            'js{,*/}*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/',
          src: ['images/{,*/}*.*', 'img/{,*/}*.*', '{,*/}*.html', 'css/fonts/{,*/}*.*'],
          dest: '<%= config.dist %>'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/',
        dest: '<%= config.dist %>/',
        src: '{,*/}*.css'
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.app %>/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/css'
        ]
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css']
    },
    
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        },{
          expand: true,
          cwd: '<%= config.app %>/img',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/img'
        }]
      }
    },
    
     // The actual grunt server settings
    connect: {
      options: {
        port: 9005,
        //open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      server: {
        options: {
          open: true,
          base: '<%= config.dist%>'
          /*,
          middleware: function(connect) {
            return [
              connect.static(config.list)
            ];
          }
          */
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      livereload: {
        options: {
          livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
        },
        files: [  //下面文件的改变就会实时刷新网页
          '<%= config.list%>/*.html',
          '<%= config.list%>/style/{,*/}*.css',
          '<%= config.list%>/{,*/}*.js',
          '<%= config.list%>/images/{,*/}*.{png,jpg}'
        ]
      }
    }

  });

  
  grunt.loadNpmTasks('grunt-contrib-sass');    //sass
  grunt.loadNpmTasks('grunt-contrib-jshint');  //检查JavaScript语法
  grunt.loadNpmTasks('grunt-contrib-uglify');  //压缩以及合并JavaScript文件
  grunt.loadNpmTasks('grunt-contrib-concat');  //合并文件
  grunt.loadNpmTasks('grunt-contrib-cssmin');  //压缩以及合并CSS文件
  grunt.loadNpmTasks('grunt-contrib-copy');    //复制文件
  grunt.loadNpmTasks('grunt-contrib-clean');   //删除文件
  grunt.loadNpmTasks('grunt-contrib-imagemin');//图片压缩
  grunt.loadNpmTasks('grunt-contrib-htmlmin'); //HTML文件压缩
  grunt.loadNpmTasks('grunt-usemin');// 
  grunt.loadNpmTasks('grunt-autoprefixer');// 
  grunt.loadNpmTasks('grunt-contrib-connect');// 
  grunt.loadNpmTasks('grunt-contrib-watch');// 
  grunt.loadNpmTasks('connect-livereload');


  grunt.registerTask('check', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'sass',
    'concat',
    'autoprefixer',
    'cssmin',
    'uglify',
    'copy',
    'usemin',
    'htmlmin',
    'imagemin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);

  grunt.registerTask('server', [
    'build',
    'connect:server:keepalive'
     // 'watch'
  ]);

};
