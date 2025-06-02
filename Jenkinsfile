pipeline{
    agent any 
    stages{
        stage("Build and run with docker compose"){
            steps{
                echo 'Starting Docker Compose build and run'
                sh 'docker-compose-down'
                sh 'docker-compose up -d --build'
            }
        }
        stage('Check Running Containers') {
            steps {
                echo 'Running containers list'
                sh 'docker ps'
            }
        }
    }
    post{
        success {
            echo 'Project deployed successfully using Docker Compose!'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}