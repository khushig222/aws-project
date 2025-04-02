pipeline {
    agent any

    environment {
        AWS_REGION = "us-north-1"
        AWS_ACCOUNT_ID = "140023382994"
        ECR_REPO_NAME = "myecr-repo"
        IMAGE_TAG = "myecr"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/khushig222/aws-project.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t $ECR_REPO_NAME:$IMAGE_TAG ."
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region $AWS_REGION | \
                        docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    """
                }
            }
        }

        stage('Tag and Push to ECR') {
            steps {
                script {
                    sh """
                        docker tag $ECR_REPO_NAME:$IMAGE_TAG \
                        $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG

                        docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPO_NAME:$IMAGE_TAG
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
