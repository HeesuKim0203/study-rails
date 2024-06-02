# Description of Environment Variables

RAILS_DB_USER_NAME: Username for the Rails database.
RAILS_DB_PASSWORD: Password for the Rails database.
RAILS_DATABASE_NAME: Name of the Rails database.
RAILS_DATABASE_HOST: Host address for the Rails database.
VITE_API_URL: Base URL for the Vite API.
OPENSEARCH_URL: URL for the OpenSearch service.
DOCKER_RAILS_SECRET_KEY: Secret key for the Dockerized Rails application.
DOCKER_DB_USER_NAME: Username for the Docker database.
DOCKER_OPENSEARCH_PASSWORD: Password for the Docker OpenSearch service.
DOCKER_OPENSEARCH_USERNAME: Username for the Docker OpenSearch service.

To use these variables, ensure they are included in your environment configuration file. For example, you can create a .env file in the root directory of your project with the above content.

# Rails Study 

Implementing a simple example site for learning Rails

## Install(MAC)

### Step1. Rbenv install and path setting

```bash
brew install rbenv ruby-build
```

.zshrc path setting

```bash
vi ~/.zshrc
```

```bash
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init - zsh)"
```

Apply configuration changes

```bash
source ~/.zshrc
```

Check rbenv

```bash
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/HEAD/bin/rbenv-doctor | bash

# Checking for `rbenv' in PATH: /opt/homebrew/bin/rbenv
# Checking for rbenv shims in PATH: OK
# Checking `rbenv install' support: /opt/homebrew/bin/rbenv-install # (ruby-build 20240501)
# Counting installed Ruby versions: 1 versions
# Auditing installed plugins: OK
```

### Step2. Install Ruby


Check available versions to install

```bash
rbenv install -l
```

Stable version check

```bash
rbenv install -l | sed -n '/^[[:space:]]*[0-9]\{1,\}\.[0-9]\{1,\}\.[0-9]\{1,\}[[:space:]]*$/ h;${g;p;}'
```

Install rudy

```bash
rbenv install 3.3.1
rbenv global 3.3.1
```

Check install rudy

```bash
rbenv versions

# system (set by /Users/dev-yakuza/.rbenv/version)
# * 3.3.1

rudy -v 

# 3.3.1
```

### Step3. Install Rails


```bash
gem install bundler
gem install rails
```

.zshrc path setting

```bash
vi ~/.zshrc
```
```bash
export PATH="$HOME/.rbenv/shims:$PATH"
```

Apply configuration changes

```bash
source ~/.zshrc
```

Check Rails
```bash
rails -v

# Rails 7.1.3.2
```

### Reference 
[rails / react](https://tech.fusic.co.jp/posts/2022-07-07-vite-rails-react/)  
[rails document](https://guides.rubyonrails.org/)

# Post man

# 🚀 Get started here

This is a template specifically created for study-rails.

## 🔖 Environment Variables

1. Create a new environment in Postman.
2. Add a variable named csrf-token. The initial value can be left blank.
    

## Pre-request Script

Add the following script to the Pre-request Script of each request:

``` javascript
const csrfUrl = pm.variables.get('csrf_url')
pm.sendRequest({
    url: `${csrfUrl}`,
    method: 'GET'
}, function (err, res) {
    if (err) {
        console.log(err)
    } else {
        const $ = cheerio.load(res.text())
        const token = $('meta[name="csrf-token"]').attr('content')
        pm.environment.set('csrf-token', token)
    }
})

```

Postman collection file [here](./postman_collection.json) can download
