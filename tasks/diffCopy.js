/*
 * grunt-diff-copy
 *
 * Copyright (c) 2014 Shane Daniel, contributors
 * Licensed under the MIT license.
 * https://github.com/simshanith/grunt-diff-copy/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  var _ = require('lodash');
  // store original values in private variable.
  var originalConfig;
  var configKey;

  function targetJoiner(taskName) {
    return function(target) {
      return [taskName, target].join(':');
    };
  }

  var copyTarget     = targetJoiner('copy');
  var diffCopyTarget = targetJoiner('diffCopy');

  var task = {
    name: 'diffCopy',
    desc: 'Copy only if changed.'
  };

  grunt.registerTask('diffCopy', 'Copy only if changed.', function() {
    // grab target from args.
    var taskChain = _.first(this.args);

    var targets;
    if( !taskChain ) {
      // Multitask emulation.
      targets = _.omit(_.keys(grunt.config('copy')), 'options');
      grunt.task.run(_.map(targets, diffCopyTarget));
      return;
    }

    var files = checkCopies(taskChain);

    configKey = 'copy.'+taskChain+'.files';
    originalConfig = grunt.config(configKey);

    if( files && files.length ) {
      // Set config to modified files only.
      grunt.config(configKey, files);
      // Run the task.
      grunt.task.run(copyTarget(taskChain));
      // Reset the config.
      grunt.task.run('diffCopy:__postrun');
    } else {
      // Display a message about the omission.
      grunt.log.warn('No files changed; copy:%s not run.', taskChain);
    }

  });

  // reset config to original values.
  grunt.registerTask('diffCopy:__postrun', function() {
    grunt.config(configKey, originalConfig);
  });

  function checkCopies(target) {
    var confPath = ['copy', target].join('.');
    grunt.config.requires(confPath);
    var conf = grunt.config(confPath);

    var srcDestPairs = conf && grunt.task.normalizeMultiTaskFiles(conf);

    function compare(src, dest) {
      var newer = grunt.file.read(src);
      var older = grunt.file.read(dest);

      var test = (newer !== older);

      return test;
    }


    srcDestPairs = _.filter(srcDestPairs, function(pair) {
      var src = pair && pair.src && _.first(pair.src);
      var dest = pair && pair.dest;

      var srcIsFile = src && grunt.file.isFile(src);
      var srcIsDir = src && grunt.file.isDir(src);
      var srcExists = src && grunt.file.exists(src);

      var srcIsRootDir = false;

      var wildCardRegex = /\/[\*]{1,2}$/;

      if ( srcIsDir && pair.orig && pair.orig.expand ) {
        if( src === pair.orig.cwd ) {
          srcIsRootDir = true;
        } else if ( src === _.first(pair.orig.src).replace(wildCardRegex, '')) {
          srcIsRootDir = true; 
        }
      }

      if ( srcIsRootDir ) {
        srcExists = false;
      }

      var destIsFile = dest && grunt.file.isFile(dest);
      var destExists = dest && grunt.file.exists(dest);

      var bothFiles = srcIsFile && destIsFile;
      var srcIsFresh = srcExists && !destExists;

      if( bothFiles ) {
        return compare(src, dest);
      } else if ( srcIsFresh ) {
        return true;
      }
    });

    if( srcDestPairs.length > 0 ) {
      grunt.log.ok('Changed files: %s', _.pluck(srcDestPairs, 'dest').join(' '));
    }

    return srcDestPairs;

  }
};
