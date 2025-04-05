pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = "byepesg/agro_online"
    }


    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    sh """
                    echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin
                    docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy to Home K8s (Dev)') {
            steps {
                script {
                    // Apply Kubernetes manifests
                    sh "kubectl apply -f k8s/dev-deployment.yaml"
                    sh "kubectl apply -f k8s/dev-service.yaml"
                }
            }
        }

        stage('Deploy to DigitalOcean (Prod)') {
            when {
                branch 'main'
            }
            steps {
                script {
                    sh "echo Deploy to DigitalOcean will go here"
                    // Or ssh into Droplet to run docker pull + restart container
                }
            }
        }
    }
}
