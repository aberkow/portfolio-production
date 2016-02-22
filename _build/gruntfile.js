module.exports = function(grunt) {

  // Project configuration.
  var initConfig = {
    pkg: grunt.file.readJSON('package.json'),
    dirs: { /* just defining some properties */
      lib: './lib/',
      theme: '../',
      assets: 'assets/',
      img: 'img/'
    },
    bower: {
      install: {
        options: {
          targetDir: './lib',
          layout: 'byComponent'
        }
      }
    },
    copy: {
      'Font-Awesome-SVG-PNG-SVG':{
        src: '<%= dirs.lib %>/Font-Awesome-SVG-PNG/svg/*.svg',
        dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>src/svg/',
        expand: true,
        flatten: true
      },
      'Font-Awesome-SVG-PNG-PNG':{
        src: '<%= dirs.lib %>/font-awesome-svg-png/png/*.png',
        dest: '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>src/png/',
        expand: true,
        flatten: true
      }
    },
    svgstore: {
      icons: {
        files: {
          '<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>icons.svg': ['<%= dirs.theme %><%= dirs.assets %><%= dirs.img %>src/svg/*.svg']
        },
        options: {
          formatting : {
            indent_size : 2
          },
          prefix: 'icon-',
          cleanup: true,
          convertNameToId: function(name) {
            return name.replace(/^\w+\_/, '');
          }
        }
      }
    },
    sass: {
      dist: {
        files: [{
            expand: true,
            cwd: 'styles',
            src: ['*.scss'],
            dest: 'public',
            ext: '.css'
          }]
      }
    }
  };

  grunt.initConfig(initConfig);

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('prebuild', ['bower', 'copy', 'svgstore']);
  
};