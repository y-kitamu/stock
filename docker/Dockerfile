FROM python:latest

ENV DEBIAN_FRONTEND=noninteractive

USER root
# add user
ARG user
ARG uid
ARG gid
RUN groupadd --gid ${gid} ${user} && useradd -m --uid ${uid} --gid ${gid} ${user}

# ssh (https://docs.docker.com/engine/examples/running_ssh_service/)
RUN apt-get update && apt-get upgrade -y && apt-get install openssh-server -y
RUN mkdir /var/run/sshd
RUN sed -ri 's/^#?PermitRootLogin\s+.*/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -ri 's/UsePAM yes/#UsePAM yes/g' /etc/ssh/sshd_config

# node
RUN apt-get update && apt-get upgrade -y &&\
    apt-get install git curl gcc nodejs npm sudo cmake build-essential -y
# npm
RUN npm install n -g && n stable
RUN apt purge -y nodejs npm

# pyright
RUN npm install pyright -g

# jupyter lab
RUN pip install jupyterlab

# jupyter lab extension
RUN pip install\
    lckr-jupyterlab-variableinspector\
    jupyterlab-lsp
# jupyterlab-emacskeys
WORKDIR /opt
RUN git clone https://github.com/kpe/jupyterlab-emacskeys.git &&\
    cd jupyterlab-emacskeys &&\
    npm install &&\
    npm run build &&\
    jupyter labextension link .
RUN jupyter lab build

# remove old version python
RUN rm -rf /usr/bin/python* && cp /usr/local/bin/python* /usr/bin/

# requirements
WORKDIR /tmp
ADD requirements_dev.txt /tmp
RUN pip install -r requirements_dev.txt && rm requirements_dev.txt
RUN apt-get install -y libjpeg-dev
ADD requirements.txt /tmp
RUN pip install -r requirements.txt && rm requirements.txt
WORKDIR /

ENV DEBIAN_FRONTEND=newt
