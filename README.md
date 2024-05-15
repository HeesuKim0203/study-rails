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
```bash
source ~/.zshrc
```

Check Rails
```bash
rails -v

# Rails 7.1.3.2
```