FROM ubuntu:jammy

ARG UID=1000
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update

RUN groupadd --gid 1000 zb3 \
    && useradd --uid 1000 --gid zb3 --shell /bin/bash --create-home zb3 && \
    apt-get install -y sudo && \
    echo 'zb3:rocks' | chpasswd && \
    gpasswd --add zb3 sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

RUN apt-get -y install openjdk-8-jdk-headless
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/

RUN apt-get -y install build-essential git make cmake python3 pkg-config wget curl ant

ENV EMSDK_HOME=/opt/emsdk
ENV EMSDK_VERSION=3.1.67

RUN git clone --depth 1 --branch ${EMSDK_VERSION} https://github.com/emscripten-core/emsdk.git ${EMSDK_HOME} && \
    cd ${EMSDK_HOME} && \
    ./emsdk install ${EMSDK_VERSION} && \
    ./emsdk activate ${EMSDK_VERSION}

# for wasm2wat
RUN apt-get install -y wabt
