#!/bin/bash

TIMEFORMAT=%R

while read in; do 
    exec 3>&1 4>&2
    var=$( { time obabel -:"$in" -O "test.png" 1>&3 2>&4; } 2>&1 )  # Captures time only.
    echo $var
    exec 3>&- 4>&- 
done < schembl.txt
