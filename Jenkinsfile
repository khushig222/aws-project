pipeline {
    agent any

    environment {
        AWS_REGION = "eu-north-1"
        AWS_ACCOUNT_ID = "${env.AWS_ACCOUNT_ID}"
        ECR_REPO_NAME = "myecr-repo"
        IMAGE_TAG = "myecr"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/khushig222/aws-project.git'
            }
        }
        stage('Check current user') {
            steps {
                script{
                    sh "echo $USER"
                }
            }
        }
        stage('Check docker version') {
            steps {
                script{
                    sh "docker --version"
                }
            }
        }
        stage('Check git version') {
            steps {
                script{
                    sh "git --version"
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build --no-cache -t $ECR_REPO_NAME:$IMAGE_TAG ."
                }
            }
        }
        stage('Login to AWS ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region $AWS_REGION | \
                        docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                    """
                }
            }
        }
        stage('Tag and Push to ECR') {
            steps {
                script {
                    sh """
                        docker tag ${ECR_REPO_NAME}:${IMAGE_TAG} \
                        ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}

                        docker push ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Build and Deployment Successful!"
        }
        failure {
            echo "Build Failed. Check Logs!"
        }
    }
}
