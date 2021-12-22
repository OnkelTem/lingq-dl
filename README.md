# Lingq.com audio lessons downloader

## Installation

```
$ npm i -g lingq-dl # NOT READY YET! Under development.
```

## Configuration

Login to https://lingq.com and copy your API key from this page: https://www.lingq.com/fr/accounts/apikey/.

Then paste it to `.lingq-dl.key` file:

```
$ echo TOKEN > .lingq-dl.key
```

## Usage

- Find a Lingq course you want to download. 

  E.g.: https://www.lingq.com/en/learn/fr/web/course/20000


- Copy the course identifier from the URL.

  In the above example it will be `20000`.


- Now use it to download all the audio:

    ```
    $ lingq-dl fr 20000
  [2021-12-21 02:39:50.209 +0300] INFO: Language: fr
  [2021-12-21 02:39:50.211 +0300] INFO: Fetching course [20000] data
  [2021-12-21 02:39:51.014 +0300] INFO: Course title: Who is She?
  [2021-12-21 02:39:51.015 +0300] INFO: Lessons: 26
  [2021-12-21 02:39:51.017 +0300] INFO: Download path: "/projects/custom/lingq/lingq-dl/fr-20000-Who is She" (auto detected)
  [2021-12-21 02:39:51.019 +0300] INFO: Starting download
  [2021-12-21 02:39:51.025 +0300] INFO: Downloading "/projects/custom/lingq/lingq-dl/fr-20000-Who is She/fr-20000-01-Who is She.mp3"
  [2021-12-21 02:39:52.035 +0300] INFO: Downloading "/projects/custom/lingq/lingq-dl/fr-20000-Who is She/fr-20000-02-Who is She.mp3"
  [2021-12-21 02:39:53.560 +0300] INFO: Downloading "/projects/custom/lingq/lingq-dl/fr-20000-Who is She/fr-20000-03-Who is She.mp3"
  ...
    ```

To be continued.


## TODO

- Put lessons text into tags? @see: https://id3.org/Lyrics3v2
- Make file-naming custom, e.g. to allow for path/name templates: $course.id$_$course.title$/$lesson.title$ and only 
  add extensions there.
