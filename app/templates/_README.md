# <%= projectSlug %>

# Install Node (probably unnecessary if you're using Yeoman!)
[Click here](http://howtonode.org/how-to-install-nodejs)

# Install Bower
$ npm install -g bower

# Install Composer
$ curl -sS https://getcomposer.org/installer | php
$ mv composer.phar /usr/local/bin/composer

# Install dependencies
$ npm install
$ bower install
$ composer update

# Build
$ grunt build

# Set permissions (maybe you need set permission 777 to application/cache folder)
$ chmod 777 application/cache

