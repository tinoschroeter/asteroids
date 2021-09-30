pipeline {
    agent any

    stages {
        stage('Build Dev') {
            steps {
                echo 'Build Dev..'
                sh '''#!/bin/bash
                      env
                      test -f k3s/dev || echo "no dev environment" && exit 0
                      cd k3s/dev/ && skaffold run
                      
                   '''
            }
        }
        stage('Build Production') {
            steps {
                echo 'Build Production....'
                sh("cd k3s/production/ && skaffold run")
            }
        }
    }
}
