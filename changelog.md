
# eslint-friendly-formatter - Changelog
## v1.0.6
- **Build Scripts Changes**
  - Release v1.0.6 - [b09e7a6]( https://github.com/royriojas/eslint-friendly-formatter/commit/b09e7a6 ), [royriojas](https://github.com/royriojas), 16/05/2015 15:04:15
    
- **Bug Fixes**
  - Support for solarized theme, or other themes that use gray for the background. Fixes [#2](https://github.com/royriojas/eslint-friendly-formatter/issues/2) - [a8c3c71]( https://github.com/royriojas/eslint-friendly-formatter/commit/a8c3c71 ), [royriojas](https://github.com/royriojas), 16/05/2015 15:02:33
    Basically this fix removes the gray color if the environment variable `EFF_NO_GRAY`
   is set to the string `true`.
   
   this can be done very easily in bash doing:
   
   ```bash
   export EFF_NO_GRAY=true
   ```
   
- **Other changes**
  - quick hack for solarized support - [40415ab]( https://github.com/royriojas/eslint-friendly-formatter/commit/40415ab ), [April Arcus](https://github.com/April Arcus), 08/05/2015 22:18:55
    
- **Documentation**
  - Added changelog - [d2afd28]( https://github.com/royriojas/eslint-friendly-formatter/commit/d2afd28 ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:37:10
    
## v1.0.5
- **Build Scripts Changes**
  - Release v1.0.5 - [86d90a3]( https://github.com/royriojas/eslint-friendly-formatter/commit/86d90a3 ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:36:35
    
  - Add lint task to automatically beautify and lint the code - [e6f8f2e]( https://github.com/royriojas/eslint-friendly-formatter/commit/e6f8f2e ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:12:28
    
  - Fixed missing changelogx section - [acf90b0]( https://github.com/royriojas/eslint-friendly-formatter/commit/acf90b0 ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:09:31
    
- **Documentation**
  - Better documentation for the integration with `intellij` or `webstorm` - [678886d]( https://github.com/royriojas/eslint-friendly-formatter/commit/678886d ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:36:21
    
- **Enhancements**
  - Use the full path to the file so IDEs like Webstorm or Intellij can parse the output - [4433a5e]( https://github.com/royriojas/eslint-friendly-formatter/commit/4433a5e ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:15:50
    
## v1.0.4
- **Build Scripts Changes**
  - Release v1.0.4 - [2af7d0c]( https://github.com/royriojas/eslint-friendly-formatter/commit/2af7d0c ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:08:13
    
  - Update deps - [b1e1539]( https://github.com/royriojas/eslint-friendly-formatter/commit/b1e1539 ), [Roy Riojas](https://github.com/Roy Riojas), 18/03/2015 02:07:56
    
  - Remove not used dep - [5b8433b]( https://github.com/royriojas/eslint-friendly-formatter/commit/5b8433b ), [Roy Riojas](https://github.com/Roy Riojas), 04/03/2015 00:04:49
    
  - Bump minor version - [097ceb0]( https://github.com/royriojas/eslint-friendly-formatter/commit/097ceb0 ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 04:13:55
    
  - Beautify and validate code with eslint - [b2bbaaf]( https://github.com/royriojas/eslint-friendly-formatter/commit/b2bbaaf ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 04:12:33
    
  - First commit - [3b57598]( https://github.com/royriojas/eslint-friendly-formatter/commit/3b57598 ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 03:33:23
    
- **Documentation**
  - bump version to include the fix in the typo in the Readme - [457516d]( https://github.com/royriojas/eslint-friendly-formatter/commit/457516d ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 12:13:02
    
  - Add module usage example - [1129146]( https://github.com/royriojas/eslint-friendly-formatter/commit/1129146 ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 03:39:05
    
  - Fix typo in Readme - [eebb0e2]( https://github.com/royriojas/eslint-friendly-formatter/commit/eebb0e2 ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 03:34:07
    
- **undefined**
  - typo - [4f7c296]( https://github.com/royriojas/eslint-friendly-formatter/commit/4f7c296 ), [Oleg Kislitsyn](https://github.com/Oleg Kislitsyn), 03/03/2015 12:02:15
    
- **Other changes**
  - Initial commit - [d448b2c]( https://github.com/royriojas/eslint-friendly-formatter/commit/d448b2c ), [Roy Riojas](https://github.com/Roy Riojas), 03/03/2015 00:00:04
    
