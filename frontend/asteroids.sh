#!/bin/bash

while :;do
output=$(curl -s -POST -H "password" \
  https://rt.fastly.com/v1/channel/16KtMrRFVaasdfaf/ps/h/limit/1 | jq .Data[].aggregated)
echo $output
sleep 1
done
