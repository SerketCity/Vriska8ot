# Work with Python 3.6
import discord
from discord.ext import commands
import asyncio
from itertools import cycle

TOKEN = 'NTQxODMwOTA2ODQ4MjE1MDUy.DzlLeA.ETQpoGiQTXrWUoqgA2VsZBiRMrw'

client = commands.Bot(command_prefix = '8')
client.remove_command('help')

@client.event
async def on_message(message):
    # we do not want the bot to reply to itself

    author = message.author
    content = message.content
    channel = message.channel
    print('{}: {}'.format(author, content))
    
    if message.author == client.user:
        return

    await client.process_commands(message)

    if message.content.startswith('8hello'):
        msg = 'Hello, {0.author.mention}!!!!!!!!'.format(message)
        await client.send_message(message.channel, msg)
        return

    if message.content.startswith('this is so sad vriska8ot play oh no'):
        msg = 'https://www.youtube.com/watch?v=uClcSaX0cj8'.format(message)
        await client.send_message(message.channel, msg)
        return

    if message.content.startswith('8say'):
        msg = message.content.split()
        output = ''
        for word in msg[1:]:
            output += word
            output += ' '    
        await client.send_message(channel, output)
        await client.delete_message(message)

@client.command(pass_context=True)
async def help(ctx):
    channel = ctx.message.channel

    embed = discord.Embed(color = 0x0715cd)

    embed.set_author(name='Vriska8ot Commands', icon_url='https://i.imgur.com/27xHF8G.png')
    embed.set_thumbnail(url='https://i.imgur.com/WVbKctv.gif')
    embed.add_field(name='8hello', value='Say hello to me', inline=False)
    embed.add_field(name='8say', value='Have me mimic you', inline=False)
    embed.set_footer(text='ᴬ ᶜᵉʳᵗᶦᶠᶦᵉᵈ ᴸᶦˡ ᶜᵒʲᶦ ᴾʳᵒᵈᵘᶜᵗ')
    await client.send_message(channel, embed=embed)

@client.command(pass_context=True)
async def join(ctx):
    channel = ctx.message.author.voice.voice_channel
    await client.join_voice_channel(channel)

@client.command(pass_context=True)
async def leave(ctx):
    server = ctx.message.server
    voice_client = client.voice_client_in(server)
    await voice_client.disconnect()   
    
@client.event
async def on_message_delete(message):
    if message.content.startswith('8say'):
        return
    
    if message.author == client.user:
        return
    else:
        await client.send_message(message.channel, 'Who deleted {}\'s message? It said: {}'.format(message.author.mention, message.content))
        return

@client.event
async def on_ready():
    await client.change_presence(game=discord.Game(name='with John\'s heart'))
    print('Logged in as')
    print(client.user.name)
    print(client.user.id)
    print('------')

client.run(TOKEN)
